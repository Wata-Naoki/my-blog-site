import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import { FeaturedPosts } from "../sections";
const posts = [
  { title: "React Testing", excerpt: "Learn React Testing" },
  { title: "React with Tailwind", excerpt: "Learn React with Tailwind" },
];

export default function Home({ posts }: any) {
  console.log(posts);
  return (
    <div className="container px-10 mx-auto mb-8 ">
      <Head>
        <title>Nao Blog</title>
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts?.map((post: any, index: number) => (
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
    revalidate: 1,
  };
}
