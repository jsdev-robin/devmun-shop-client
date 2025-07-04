import MainLogo from '@repo/ui/components/main-logo';
import React from 'react';

const Loading = () => {
  return (
    <div className="h-svh flex items-center justify-center flex-col gap-4 fixed top-0 left-0 bottom-0 right-0 bg-background z-50">
      <MainLogo className="text-2xl size-20 border border-border rounded-full flex items-center justify-center" asChild />
    </div>
  );
};

export default Loading;
