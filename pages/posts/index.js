import Link from "next/link";

import { fetchPosts } from "../../utils";
import { backendURL } from "../../utils/backend";

export default function Posts({ posts }) {
  return (
    <div>
      <h3>All Posts</h3>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Link
              href={`/posts/${post.slug}`}
              as={`${backendURL}/posts/${post.slug}`}
            >
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
