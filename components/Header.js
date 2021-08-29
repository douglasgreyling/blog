import Link from "next/link";

import { backendURL } from "../utils/backend";

export default function Header() {
  return (
    <header>
      <div className="flex py-1.5 items-center">
        <Link href={backendURL + "/"} as={backendURL + "/"}>
          <a className="mr-auto hover:bg-gray-700 hover:no-underline p-3 hover:text-white py-1.5 rounded transition duration-200">
            <h1 className="text-2xl mb-0">Douglas Greyling</h1>
          </a>
        </Link>
        <Link href="/posts" as={backendURL + "/posts"}>
          <a className="button">All Posts</a>
        </Link>
      </div>
    </header>
  );
}
