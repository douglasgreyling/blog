import Head from "next/head";
import Link from "next/link";

import Post from "../components/Post";
import { fetchPosts } from "../utils";
import { backendURL } from "../utils/backend";

import styles from "../styles/Home.module.scss";

export default function Home({ posts }) {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Douglas Greyling</title>
        </Head>
      </div>

      <div className="posts">
        {posts.map((post, index) => (
          <div key={index}>
            <Post
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              content={post.content}
              slug={post.slug}
            />
            <hr className="my-10" />
          </div>
        ))}
      </div>

      <div className="flex justify-center pb-20">
        <Link href="/posts" as={backendURL + "/posts"}>
          <a className="button">
            <h4>Read more posts</h4>
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = fetchPosts().slice(0, 4);

  return {
    props: {
      posts,
    },
  };
}
