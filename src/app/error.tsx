"use client"

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export const metadata = {
  title: 'Error',
};

interface ErrorPageProps {
  error: Error & { digest?: string };
}

const ErrorPage = ({ error }: ErrorPageProps) => {

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <section
      id="error"
      className="flex items-center justify-center w-full min-h-screen py-8 text-gray-900 page md:py-16 ">
      <div className="relative flex flex-col items-center w-full gap-8 px-8 md:px-18 xl:px-40 md:gap-16">
        <h1 className="text-9xl md:text-[300px] w-full select-none  text-center font-black  text-white">
          404
        </h1>
        <p className="text-3xl font-bold capitalize text-white">
          Page Not Found
        </p>
        <p className="text-2xl font-medium wrap-break-words text-dull text-gray-400">
          The page you are looking for does not exist.
        </p>
      </div>
    </section>
  );
};

export default ErrorPage;
