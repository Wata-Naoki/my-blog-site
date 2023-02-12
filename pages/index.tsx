import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts, getPostsCount } from "../services";
import { FeaturedPosts } from "../sections";
import { Pagination } from "../components/ui/Pagination";
import { usePagination } from "../hooks/usePagination";
import {
  fadeInPopup,
  pageTransition,
  sectionPageTransition,
} from "../components/animations/variants";
import { motion } from "framer-motion";
export type Posts = {
  posts: Post[];
  postCounts: PostCounts;
};

export type Post = {
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
type PostCounts = {
  count: number;
};

export default function Home({ posts, postCounts }: any) {
  const {
    take,
    skip,
    totalCount,
    currentPage,
    totalPage,
    goNext,
    goPrev,
    goPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination({ totalCount: postCounts || 0 });
  return (
    <div className="container px-10 mx-auto mb-8 ">
      <Head>
        <title>Nao Blog</title>
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts?.slice(skip, skip + take).map((post: Post, index: number) => (
            <motion.div {...pageTransition} key={`${skip}-${index}`}>
              <PostCard post={post.node} key={index} />
            </motion.div>
          ))}
          <div>
            <Pagination
              totalPage={totalPage}
              onPageClick={(num) => goPage(num)}
              currentPage={currentPage}
              onNextClick={goNext}
              onPrevClick={goPrev}
              showNext={hasNextPage}
              showPrev={hasPrevPage}
            />
          </div>
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

// takeとskipを使って、ページネーションを実装する。getPostsの引数に入れる。
export async function getStaticProps() {
  const posts = await getPosts();
  const postCounts = await getPostsCount();
  return {
    props: { posts, postCounts },
    revalidate: 60,
  };
}
