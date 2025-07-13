'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@repo/ui/components/card';
import { useMuntahaDrop } from 'react-muntaha-uploader';
import { Camera, Trash, Loader2, AlertCircle, Loader } from 'lucide-react';
import Text from '@repo/ui/components/text';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import { Button } from '@repo/ui/components/button';
import { toast } from 'sonner';
import {
  useDeleteTempImgByIdMutation,
  useSetTempImgMutation,
} from '../../../../../../lib/features/services/utils/utilsApi';

interface CloudinaryResponse {
  asset_id?: string;
  public_id?: string;
  url?: string;
  secure_url?: string;
  localUrl?: string;
  loading?: boolean;
  error?: boolean;
  type?: 'image' | 'video';
}

const ProductMedia = () => {
  const [uploadedImages, setUploadedImages] = useState<CloudinaryResponse[]>(
    [],
  );
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [setTempImg] = useSetTempImgMutation();
  const [deleteTempImgById, { isLoading }] = useDeleteTempImgByIdMutation();

  console.log(uploadedImages);

  const handleDeleteImage = (publicId: string) => {
    if (!publicId) return;
    setDeletingIds((prev) => [...prev, publicId]);

    deleteTempImgById(publicId)
      .unwrap()
      .catch(() => {
        toast.error('Failed to delete image.');
        setDeletingIds((prev) => prev.filter((id) => id !== publicId));
      });
  };

  useEffect(() => {
    if (!isLoading && deletingIds.length > 0) {
      setUploadedImages((prev) =>
        prev.filter((img) => !deletingIds.includes(img.public_id ?? '')),
      );
      toast.success('Image deleted successfully.');
      setDeletingIds([]);
    }
  }, [isLoading, deletingIds]);

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

  const { getRootProps, getInputProps, utils, isDragActive, error } =
    useMuntahaDrop({
      accept: ['image/*', 'video/*'],
      maxSize: 10 * 1024 * 1024,
      maxFiles: 10,
      multiple: true,
      onDrop: async (files: File[] | null) => {
        if (!files) return;

        if (uploadedImages.length + files.length > 10) {
          toast.error(`You can upload a maximum of 10 files`);
          utils.reset();
          return;
        }

        const previews: CloudinaryResponse[] = files.map((file) => ({
          localUrl: URL.createObjectURL(file),
          loading: true,
          type: file.type.startsWith('video/') ? 'video' : 'image',
        }));

        setUploadedImages((prev) => [...prev, ...previews]);

        try {
          const results = await Promise.all(
            files.map(async (file, i) => {
              try {
                const response = await uploadToCloudinary(file);
                return {
                  ...response,
                  localUrl: previews[i].localUrl,
                  loading: false,
                  error: false,
                  type: previews[i].type,
                };
              } catch {
                toast.error(`Failed to upload "${file.name}"`);
                return {
                  localUrl: previews[i].localUrl,
                  loading: false,
                  error: true,
                  type: previews[i].type,
                };
              }
            }),
          );

          setUploadedImages((prev) =>
            prev.map((img) => {
              const uploaded = results.find(
                (res) => res.localUrl === img.localUrl,
              );
              return uploaded || img;
            }),
          );
        } finally {
          utils.reset();
        }
      },
    });

  useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => {
        if (img.localUrl?.startsWith('blob:')) {
          URL.revokeObjectURL(img.localUrl);
        }
      });
    };
  }, [uploadedImages]);

  const uploadToCloudinary = async (
    file: File,
  ): Promise<CloudinaryResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'devmun');
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dft8nx292/auto/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!res.ok) throw new Error('Upload failed');

    return (await res.json()) as CloudinaryResponse;
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
              {img.error ? (
                <div className="absolute inset-0 bg-red-100/80 flex items-center justify-center text-red-600 flex-col gap-1">
                  <AlertCircle className="size-6" />
                  <Text variant="body2">Upload Failed</Text>
                </div>
              ) : (
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
                  {img.loading && (
                    <Loader2 className="animate-spin absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 size-10" />
                  )}
                </>
              )}
            </Card>
          ))}
          {uploadedImages.length < 10 && (
            <Card
              className={cn(
                'aspect-square p-0 gap-0',
                isDragActive && 'border-blue-500 border-dashed',
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <Camera className="size-10" />
                <Text variant="body2" weight="semibold">
                  Add ({10 - uploadedImages.length} remaining)
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
