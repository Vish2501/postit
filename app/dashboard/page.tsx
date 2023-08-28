import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <main>
      <h1 className="text-2x1 font-bold">
        {" "}
        Welcome back {session?.user?.name}
      </h1>
      <MyPosts />
    </main>
  );
}
