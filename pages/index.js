import Head from "next/head";
import Link from "next/link";

import Post from "../components/Post";
import { fetchPosts } from "../utils";

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
          <Post
            key={index}
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            content={post.content}
            slug={post.slug}
          />
        ))}
      </div>

      <Link href="/posts">
        <a>
          <h4>Read more posts...</h4>
        </a>
      </Link>
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
