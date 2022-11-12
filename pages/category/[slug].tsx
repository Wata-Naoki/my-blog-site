import { useRouter } from "next/router";
import React from "react";
import { Loader, PostCard } from "../../components";
import { getCategories, getCategoryPost } from "../../services";

const CategoryPost = ({ posts }: any) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <div className="container px-10 mx-auto mb-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts?.map((post: any, index: number) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;

export async function getStaticProps({ params }: any) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }: any) => ({ params: { slug } })),
    fallback: true,
  };
}
