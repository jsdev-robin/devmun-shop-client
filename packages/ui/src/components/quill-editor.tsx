/* eslint-disable react/prop-types */
import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from './skeleton';
import { useMounted } from '../hooks/use-mounted';
import { cn } from '../lib/utils';

const QuillEditorDynamic = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full" />,
});

interface EditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}

interface EditorStaticProps {
  modules: Record<string, unknown>;
  formats: string[];
}

const QuillEditor: React.FC<EditorProps> & EditorStaticProps = ({
  onChange = () => {},
  value = '',
  className,
  ...props
}) => {
  const mounted = useMounted();

  if (!mounted) {
    return <Skeleton className="h-[250px] w-full" />;
  }

  return (
    <div
      {...props}
      className={cn(
        'border-input w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-hidden',
        'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
    >
      <QuillEditorDynamic
        modules={QuillEditor.modules}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="Write something..."
      />
    </div>
  );
};

QuillEditor.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    [{ direction: 'rtl' }],
    ['blockquote', 'code-block'],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ size: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

QuillEditor.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'script',
  'list',
  'bullet',
  'indent',
  'align',
  'direction',
  'blockquote',
  'code-block',
  'color',
  'background',
  'font',
  'size',
  'link',
  'image',
  'video',
];

export default QuillEditor;
