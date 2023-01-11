import React, { useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

type Props = {
  children: React.ReactNode;
  modifiedText: string;
};
export const CodeBlock = ({ children, modifiedText }: Props) => {
  const [isCopied, setIsCopied] = React.useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <>
      <div className="flex justify-between text-sm text-white bg-opacity-50 rounded bg-neutral-500 ">
        <div className="px-6 py-6">{children}</div>
        <CopyToClipboard
          text={modifiedText}
          onCopy={() => setIsCopied((prev) => !isCopied)}
        >
          <div className="flex flex-col items-center justify-start mr-2 ">
            <div className={`${isCopied ? " visible" : "invisible"}`}>
              Copied！
            </div>
            <div className="cursor-pointer">
              <svg
                className={`w-5 h-5  focus:ring-gray-300 hover:text-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ${
                  isCopied ? "text-white" : "text-gray-300"
                }`}
                fill={"none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
          </div>
        </CopyToClipboard>
      </div>
    </>
  );
};
