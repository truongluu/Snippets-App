"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateSnippet = async (id: number, code: string) => {
  await db.snippet.update({ where: { id }, data: { code } });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({ where: { id } });
  revalidatePath("/");
  redirect(`/`);
};

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    //   Check the user's input and make sure they're valid
    const title = formData.get("title");
    const code = formData.get("code");
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer",
      };
    }
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer",
      };
    }
    // Create a new record in database
    await db.snippet.create({ data: { title, code } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "Something went wrong!" };
    }
  }
  revalidatePath("/");
  // Redirect user back to the root route
  redirect("/");
}
