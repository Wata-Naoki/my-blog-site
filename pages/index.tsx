import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import { FeaturedPosts } from "../sections";

type Posts = {
  posts: Post[];
};

type Post = {
  node: {
    title: string;
    author: {
      name: string;
      bio: string;
      photo: {
        url: string;
      };
    };
    featuredImage: {
      url: string;
    };
    slug: string;
    createdAt: string;
    excerpt: string;
    categories: {
      name: string;
      slug: string;
    }[];
  };
};

export default function Home({ posts }: Posts) {
  return (
    <div className="container px-10 mx-auto mb-8 ">
      <Head>
        <title>Nao Blog</title>
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts?.map((post: Post, index: number) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
    revalidate: 60,
  };
}
