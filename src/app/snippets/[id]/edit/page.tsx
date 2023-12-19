import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

export default async function asyncSnippetEditPage(props: {
  params: { id: string };
}) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });
  if (!snippet) {
    return notFound();
  }
  return (
    <div>
      <h1>Edit snippet with id: {props.params.id}</h1>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
