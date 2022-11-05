/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import moment from "momnet";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ categories, slug }: any) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug);
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug, categories]);
  return (
    <div className="p-8 mb-8 bg-white rounded-lg shadow-lg">
      <h3 className="pb-4 mb-8 text-lg font-semibold border-b">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post: any, index: number) => (
        <div className="flex items-center w-full" key={post.title}>
          <div className="flex-none w-16">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full object-full"
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
