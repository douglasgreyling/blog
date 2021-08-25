import Link from "next/link";

import { fetchPosts } from "../../utils";

export default function Posts({ posts }) {
  return (
    <div>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.frontmatter.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const posts = fetchPosts();

  return {
    props: {
      posts,
    },
  };
}
