'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@repo/ui/components/card';
import { useMuntahaDrop } from 'react-muntaha-uploader';
import { Camera, Trash, Loader2, Loader } from 'lucide-react';
import Text from '@repo/ui/components/text';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import { Button } from '@repo/ui/components/button';
import { toast } from 'sonner';
import {
  useDeleteTempImgByIdMutation,
  useSetTempImgMutation,
} from '../../../../../../../lib/features/services/utils/utilsApi';
import { useSelector } from 'react-redux';
import {
  RootState,
  useAppDispatch,
} from '../../../../../../../lib/features/store';
import {
  CloudinaryResponse,
  uploadImages,
} from '../../../../../../../lib/features/services/third-party/cloudinaryApi';

const ProductMedia = () => {
  const [uploadedImages, setUploadedImages] = useState<CloudinaryResponse[]>(
    [],
  );
  const [setTempImg] = useSetTempImgMutation();
  const loading = useSelector((state: RootState) => state.images.loading);
  const dispatch = useAppDispatch();
  const [deleteTempImgById] = useDeleteTempImgByIdMutation();
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  const publicIds = useMemo(() => {
    return uploadedImages
      .map((item) => item.public_id)
      .filter((id): id is string => typeof id === 'string');
  }, [uploadedImages]);

  useEffect(() => {
    if (publicIds.length > 0) {
      setTempImg({ publicId: publicIds });
    }
  }, [publicIds, setTempImg]);

  const { getRootProps, getInputProps, isDragActive, utils, error } =
    useMuntahaDrop({
      accept: ['image/*', 'video/*'],
      maxSize: 10 * 1024 * 1024,
      maxFiles: 10,
      multiple: true,
      onDrop: async (files: File[] | null) => {
        if (!files) return;

        if (uploadedImages.length + files.length > 10) {
          toast.error(
            `Maximum 10 files allowed (you have ${uploadedImages.length})`,
          );
          utils.reset();
          return;
        }

        const previews: CloudinaryResponse[] = files.map((file) => ({
          localUrl: URL.createObjectURL(file),
          type: file.type.startsWith('video/') ? 'video' : 'image',
          loading: true,
        }));

        setUploadedImages((prev) => [...prev, ...previews]);

        try {
          const results = await dispatch(uploadImages(files));
          if (uploadImages.fulfilled.match(results)) {
            const uploadedResults = results.payload.map((img, i) => ({
              ...img,
              localUrl: previews[i].localUrl,
              type: previews[i].type,
              loading: false,
              error: false,
            }));

            setUploadedImages((prev) =>
              prev.map((img) => {
                const uploaded = uploadedResults.find(
                  (res) => res.localUrl === img.localUrl,
                );
                return uploaded || img;
              }),
            );
          }
        } catch {
          toast.error('Some files failed to upload');
        } finally {
          previews.forEach((preview) => URL.revokeObjectURL(preview.localUrl));
          utils.reset();
        }
      },
    });

  const handleDeleteImage = async (publicId: string) => {
    if (!publicId) return;
    setDeletingIds((prev) => [...prev, publicId]);
    utils.reset();
    await toast.promise(
      deleteTempImgById(publicId)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Deleting file...',
        success: (res) => {
          setUploadedImages((prev) =>
            prev.filter((img) => img.public_id !== publicId),
          );
          return res?.message || 'File deleted successfully';
        },
        error: (err) => {
          setDeletingIds((prev) => prev.filter((id) => id !== publicId));
          return err?.data?.message || 'Failed to delete file';
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>Media Assets</CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {uploadedImages.map((img, idx) => (
            <Card
              className="aspect-square p-0 gap-0 overflow-hidden relative"
              key={idx}
            >
              <>
                {img.type === 'video' ? (
                  <video
                    src={img.secure_url || img.url || img.localUrl}
                    className={cn(
                      'size-full object-cover',
                      img.loading && 'opacity-50',
                    )}
                    muted
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    src={img.secure_url || img.url || img.localUrl || ''}
                    alt="uploaded"
                    width={600}
                    height={600}
                    className={cn(
                      'size-full object-cover',
                      img.loading && 'opacity-50',
                    )}
                  />
                )}
              </>
              {img.loading && (
                <Loader2 className="animate-spin absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 size-10" />
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleDeleteImage(img.public_id ?? '')}
                disabled={deletingIds.includes(img.public_id ?? '')}
              >
                {deletingIds.includes(img.public_id ?? '') ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Trash />
                )}
              </Button>
            </Card>
          ))}
          {uploadedImages.length < 10 && (
            <Card
              className={cn(
                'aspect-square p-0 gap-0',
                isDragActive && 'border-blue-500 border-dashed',
                loading && 'opacity-50 cursor-not-allowed',
              )}
              {...(!loading ? getRootProps() : {})}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <Camera className="size-10" />
                <Text variant="body2" weight="semibold">
                  Add remaining
                </Text>
              </div>
            </Card>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {error ? (
          <Text textColor="destructive">{error}</Text>
        ) : (
          <Text textColor="muted">
            You can upload up to 10 files (images and videos).
          </Text>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductMedia;
