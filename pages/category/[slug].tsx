import { useRouter } from "next/router";
import React from "react";
import { Loader } from "../../components";

const CategoryPost = () => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default CategoryPost;
