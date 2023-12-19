"use client";

import * as actions from "@/actions";
import Editor from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { useState } from "react";

interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string | undefined = "") => {
    setCode(value);
  };

  const editSnippetAction = actions.updateSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height={"40vh"}
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button className="border rounded p-2 mt-4">Save</button>
      </form>
    </div>
  );
}
