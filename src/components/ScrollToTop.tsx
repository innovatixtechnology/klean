"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, []);

  return (
    <div className="z-99 fixed bottom-8 right-8">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="hover:shadow-signUp rounded-full bg-primary hover:bg-primary/80 flex h-10 w-10 p-2 cursor-pointer items-center justify-center text-white shadow-md transition duration-300 ease-in-out">
          <span className="mt-1.5 h-3 w-3 rotate-45 border-l border-t border-white" />
          <span className="sr-only">scroll to top</span>
        </button>
      )}
    </div>
  );
}
