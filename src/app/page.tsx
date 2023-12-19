import Link from "next/link";
import { db } from "../db";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  const renderSnippets = snippets.map((snippet) => (
    <Link
      key={snippet.id}
      href={`/snippets/${snippet.id}`}
      className="flex justify-between items-center p-2 mb-2 rounded border"
    >
      <div>{snippet.title}</div>
      <div>View</div>
    </Link>
  ));
  return (
    <div>
      <div className="flex items-center justify-between py-4 mb-6">
        <h1 className="font-bold text-3xl ">Snippet</h1>
        <Link href="/snippets/new" className="border rounded p-2">
          New
        </Link>
      </div>
      {renderSnippets}
    </div>
  );
}
