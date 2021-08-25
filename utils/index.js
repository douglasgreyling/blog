import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";

export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};

export const fetchPostSlugs = () => {
  const files = fs.readdirSync(path.join("posts"));

  return files.map((filename) => filename.replace(".md", ""));
};

export const fetchPost = (slug) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return { frontmatter, slug, content: marked(content) };
};

export const fetchPosts = () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
      content: marked(content),
    };
  });

  return posts.sort(sortByDate);
};
