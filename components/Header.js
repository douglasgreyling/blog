import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex bg-gray-800 text-white py-1.5 px-8 items-center">
        <Link href="/">
          <a className="mr-auto hover:bg-gray-700 px-3 py-1.5 rounded transition duration-200">
            <h1 className="text-2xl">Douglas Greyling</h1>
          </a>
        </Link>
        <Link href="/posts">
          <a className="bg-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-500 transition duration-200">
            All Posts
          </a>
        </Link>
      </div>
    </header>
  );
}
