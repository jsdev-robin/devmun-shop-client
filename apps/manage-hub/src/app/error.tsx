'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
      <AlertCircle className="text-red-500 w-20 h-20 mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Something went wrong
      </h2>
      <p className="text-lg text-gray-600 max-w-md mb-6">
        An unexpected error has occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-5 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
}
