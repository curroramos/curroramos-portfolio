import { useState, useEffect } from "react";
import BookCanvas from "./BookCanvas.jsx";

const Media = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide the tooltip after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="media">
      {/* Header */}
      <div className="c-space pt-8 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Media Gallery
            </h2>
          </div>
        </div>
      </div>

      {/* Tooltip positioned closer to header */}
      {showTooltip && (
        <div className="c-space pb-2">
          <div className="max-w-7xl mx-auto flex justify-center">
            <div
              className="px-6 py-3 bg-black bg-opacity-70 rounded-lg
                          text-white flex items-center animate-pulse transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Click the book to explore</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative flex-grow -mt-8">
        <BookCanvas />

        {/* Subtle interactive hint that appears on hover */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2
                      bg-black bg-opacity-50 text-white px-4 py-0 rounded-full
                      hover:bg-opacity-70 transition-all cursor-pointer"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <span className="text-sm">Interactive Media</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Media;
