import Link from "next/link";

import Post from "../../components/Post";
import { fetchPostSlugs, fetchPost } from "../../utils";

export default function PostPage({ frontmatter: { title, date }, content }) {
  return <Post title={title} date={date} content={content} />;
}

export async function getStaticPaths() {
  const slugs = fetchPostSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: fetchPost(slug),
  };
}
