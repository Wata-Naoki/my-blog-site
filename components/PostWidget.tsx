/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
import moment from "moment";
import { PostWidget, RelatedPosts } from "../types/types";
const PostWidget = ({ categories, slug }: PostWidget) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug, categories]);
  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-lg font-semibold border-b">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts?.map((post: RelatedPosts, index: number) => (
        <div className="flex items-center w-full my-2" key={post.title}>
          <div className="flex-none w-16">
            <img
              alt={post.title}
              className="object-cover w-full h-16 rounded-full"
              height="60px"
              width="60px"
              src={post.featuredImage?.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-xs text-gray-500">
              {moment(post?.createdAt).format("MMM DD YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
