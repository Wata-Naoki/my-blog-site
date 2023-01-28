/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useEffect } from "react";
import { PostDetail } from "../types/types";
import { getContentFragment } from "./helpers/getContentFragment";
const PostDetail = ({ post }: PostDetail) => {
  // boolean state
  const [isExpanded, setIsExpanded] = React.useState(false);
  // TODO: any型の修正
  return (
    <div className="pb-12 mb-8 bg-white rounded-lg shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md">
        <img
          src={post?.featuredImage?.url}
          alt={post?.title}
          className="object-center w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center w-full mb-8">
          <div className="flex items-center justify-center w-full mb-4 mr-8 lg:mb-0 lg:w-auto">
            <img
              alt={post?.author?.name}
              height="30px"
              width="30px"
              src={post?.author?.photo?.url}
              className="align-middle rounded-full"
            />
            <p className="inline ml-2 text-lg text-gray-700 align-middle">
              {post?.author?.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-6 h-6 mr-2 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post?.createdAt).format("MMM DD YYYY")}</span>
          </div>
        </div>
        <h1 className="pb-4 mt-10 mb-12 text-3xl font-semibold border-b-2">
          {post.title}
        </h1>
        <div className="whitespace-pre-wrap">
          {post?.content?.raw?.children?.map((typeObj: any, index: number) => {
            const children = typeObj?.children?.map(
              (item: any, itemIndex: number) =>
                getContentFragment(itemIndex, item.text, item)
            );
            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
