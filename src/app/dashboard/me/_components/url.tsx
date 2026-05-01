"use client";
import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

interface UrlPreviewProps {
  username?: string;
}

export function UrlPreview({ username: slug }: UrlPreviewProps) {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState(slug);

  async function handleSubmit(formData: FormData) {
    const username = formData.get("username") as string;

    if (username === "") return;

    const response = await createUsername({ username });

    if (response.error) {
      setError(response.error);
      return;
    }

    if (response.data) {
      setUsername(response.data);
    }
  }

  if (!!slug) {
    const usernameUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/creator/${username}`;

    return (
      <div className="flex items-center justify-between flex-1 p-2 text-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2">
          <h3 className="font-bold text-lg">Sua URL:</h3>
          <Link href={usernameUrl} target="_blank">
            {usernameUrl}
          </Link>

          <Link
            target="_blank"
            href={usernameUrl}
            className="bg-blue-500 px-4 py-1 rounded-md hidden md:block"
          >
            <Link2 target="_blank" className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center flex-1 p-2 text-gray-100">
        <form
          className="flex flex-1 flex-col md:flex-row gap-4 items-start md:items-center"
          action={handleSubmit}
        >
          <div className="flex items-center justify-center w-full ">
            <p>{process.env.NEXT_PUBLIC_HOST_URL}/creator/</p>
            <input
              type="text"
              className="flex-1 outline-none border h-9 border-gray-300 text-black rounded-md bg-gray-50 px-1"
              placeholder="Digite seu username..."
              name="username"
            />
          </div>

          <Button
            type="submit"
            className="bg-blue-500 h-9 w-full md:w-fit text-white px-4 rounded-md hover:bg-blue-600 transition-all cursor-pointer"
          >
            Salvar
          </Button>
        </form>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
