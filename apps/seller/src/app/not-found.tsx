import React from "react";
import { AlertTriangle } from "lucide-react";
import Heading from "@repo/ui/components/heading";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
      <AlertTriangle className="text-yellow-500 w-20 h-20 mb-6" />
      <Heading className="text-4xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </Heading>
      <p className="text-lg text-gray-600 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
    </div>
  );
};

export default NotFound;
