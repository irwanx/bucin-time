"use client";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-4 justify-center items-center p-6 bg-white rounded-md shadow-md max-w-screen-sm w-full">
        <h2 className="text-xl font-semibold text-red-600">{error.message}</h2>
        <p className="text-gray-700">
          Oops, something went wrong. Please try again.
        </p>
        <Button onClick={reset} className="mt-4">
          Try Again
        </Button>
      </div>
    </div>
  );
}
