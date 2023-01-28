import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { getComments } from "../services";
import moment from "moment";
import { Comments, CommentsSlug } from "../types/types";
const Comments = ({ slug }: CommentsSlug) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(slug).then((result) => {
      setComments(result);
    });
  }, [slug]);
  return (
    <>
      {comments.length > 0 && (
        <div className="p-8 pb-12 mb-8 bg-white shadow-lg">
          <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
            {comments.length} Comments
          </h3>
          {comments.map((comment: Comments, index: number) => (
            <div key={index} className="mb-8">
              <p className="mb-4">
                <span className="">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="w-full text-gray-600 whitespace-pre-line">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
