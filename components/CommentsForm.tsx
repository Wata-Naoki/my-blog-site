import React, { useRef, useState } from "react";

const CommentsForm = ({ slug }: any) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const nameEl = useRef();
  const emailEl = useRef();
  //commentElのuseRefの型を定義する
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const storeDataEl = useRef();

  return (
    <div className="p-8 pb-12 mb-8 bg-white shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">CommentsForm</h3>
      <div className="grid grid-cols-1 gap-4 mb-4 ">
        <textarea
          ref={commentEl}
          className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 "></div>
      <div className="grid grid-cols-1 gap-4 mb-4 "></div>
    </div>
  );
};

export default CommentsForm;
