import React from "react";

type Props = {
  children: React.ReactNode;
};

export const BlockQuote = ({ children }: Props) => {
  return (
    <div className="p-4 my-10 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
      <p className="text-xl font-medium leading-relaxed text-gray-900 dark:text-white">
        {children}
      </p>
    </div>
  );
};
