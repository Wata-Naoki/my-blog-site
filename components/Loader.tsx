import React from "react";

const Loader = () => {
  return (
    <div className="text-center">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-500 border border-transparent rounded-md cursor-not-allowed hover:bg-zinc-500 focus:border-zinc-700 active:bg-zinc-700"
      >
        <svg
          className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Loading
      </button>
    </div>
  );
};

export default Loader;
