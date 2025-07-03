'use client';

import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface TagInputProps {
  maxTags?: number;
  onChange?: (tags: string[]) => void;
  value?: string[];
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  maxTags = 13,
  onChange,
  value,
  placeholder = 'Add a tag',
}) => {
  const [tags, setTags] = useState<string[]>(value || []);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value) {
      setTags(value);
    }
  }, [value]);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        onChange?.(updatedTags);
      }

      setInputValue('');
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    onChange?.(updatedTags);
  };

  return (
    <div className="border-input focus-visible:border-ring min-h-8 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex flex-wrap gap-2 field-sizing-content w-full rounded-md border bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm py-1  items-center">
      {tags.length > 0 &&
        tags.map((tag) => (
          <span
            key={tag}
            className="bg-muted flex items-center gap-x-1 h-7 px-2 text-xs font-medium rounded-full"
          >
            {tag}
            <X
              className="size-3 cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </span>
        ))}

      {tags.length < maxTags && (
        <input
          className="bg-transparent min-w-20 max-h-7 border border-border md:text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTag}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default TagInput;
