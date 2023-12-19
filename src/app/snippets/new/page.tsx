"use client";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

export default function SnippetCreatePage() {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input name="title" className="border rounded w-full p-2" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            id="code"
            className="border rounded w-full p-2"
          />
        </div>
      </div>
      {formState.message ? (
        <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
          {formState.message}
        </div>
      ) : null}
      <button className="rounded  border w-full p-2 bg-blue-200">Create</button>
    </form>
  );
}
