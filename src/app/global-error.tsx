"use client";

import Link from "next/link";

interface ErrorPageProps {
  // error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ reset }: ErrorPageProps) => {
  return (
    <section
      id="error"
      className="flex items-center justify-center w-full min-h-screen py-8 text-gray-900 page md:py-16 ">
      <div className="relative flex flex-col items-center w-full gap-8 px-8 md:px-18 xl:px-40 md:gap-16">
        <h1 className="text-9xl md:text-[300px] w-full select-none  text-center font-black  text-gray-400">
          404
        </h1>
        <p className="text-3xl font-bold capitalize">
          You have discovered a secret place
        </p>
        <p className="text-2xl font-medium wrap-break-words text-dull">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default GlobalError;
