import Link from "next/link";

export default function Post({ title, date, content, slug }) {
  const renderTitle = () => {
    if (slug === undefined) {
      return <h1>{title}</h1>;
    } else {
      return (
        <Link href={`/posts/${slug}`}>
          <a>
            <h1>{title}</h1>
          </a>
        </Link>
      );
    }
  };

  return (
    <div>
      {renderTitle()}
      <h2 className="text-gray-400 font-extralight mb-5 text-lg">{date}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
