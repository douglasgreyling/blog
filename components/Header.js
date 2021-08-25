import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container">
        <Link href="/">
          <a>
            <h2>Douglas Greyling</h2>
          </a>
        </Link>
        <h3>A blog about the things I learn</h3>
      </div>
      <div>
        <Link href="/posts">
          <a>All posts</a>
        </Link>
      </div>
    </header>
  );
}
