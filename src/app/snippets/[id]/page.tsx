import * as actions from "@/actions";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
interface ShowSnippetProps {
  params: {
    id: string;
  };
}
export default async function ShowSnippet(props: ShowSnippetProps) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet?.id);
  return (
    <div>
      <div className="flex items-center justify-between py-6">
        <h1 className="font-bold text-3xl">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            className="rounded border p-2"
            href={`/snippets/${props.params.id}/edit`}
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="rounded border p-2">Delete</button>
          </form>
        </div>
      </div>
      <pre className="border rounded bg-gray-300 p-4">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => {
    return { id: snippet.id.toString() };
  });
}
