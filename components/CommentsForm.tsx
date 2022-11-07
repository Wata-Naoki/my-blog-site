import React, { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }: any) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const nameEl = useRef<any>();
  const emailEl = useRef<any>();
  const commentEl = useRef<any>(null);
  const storeDataEl = useRef<any>();

  useEffect(() => {
    nameEl.current.value = localStorage.getItem("name");
    emailEl.current.value = localStorage.getItem("email");
  }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl?.current;
    const { value: name } = nameEl?.current;
    const { value: email } = emailEl?.current;
    const { checked: storeData } = storeDataEl?.current;

    if (!comment || !name || !email) {
      setError(true);
      setMessage("Please fill out all fields");
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };
    if (typeof window === "object") {
      if (storeData) {
        window.localStorage.setItem("name", name);
        window.localStorage.setItem("email", email);
      } else {
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("email");
      }
      submitComment(commentObj).then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      });
    }
  };

  return (
    <div className="p-8 pb-12 mb-8 bg-white shadow-lg">
      <h3 className="pb-4 mb-8 text-xl font-semibold border-b">CommentsForm</h3>
      <div className="grid grid-cols-1 gap-4 mb-4 ">
        <textarea
          ref={commentEl}
          className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={emailEl}
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4 ">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="ml-2 text-gray-500 cursor-pointer"
            htmlFor="storeData"
          >
            Save my email and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 ">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="inline-block px-8 py-3 text-lg text-white transition duration-500 bg-gray-600 rounded-full cursor-pointer ease hover:bg-zinc-900"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-zinc-300 ">
            {showSuccessMessage && "Comment submitted successfully !"}
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
