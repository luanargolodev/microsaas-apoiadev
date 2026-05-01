import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UrlPreview } from "./_components/url";

export default async function Me() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const userData = {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    username: session.user.username,
    bio: session.user.bio,
    image: session.user.image,
  };

  return (
    <main className="w-full h-full flex gap-4 flex-col items-center p-4">
      <section className="w-full flex lg:flex-row flex-col lg:items-center mx-auto bg-zinc-900 rounded-md p-4 gap-2">
        <UrlPreview username={userData.username} />
      </section>
    </main>
  );
}
