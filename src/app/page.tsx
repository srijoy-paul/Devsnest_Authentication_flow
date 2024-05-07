import Link from "next/link";

// import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.auth.signup({
    name: "Srijoy Paul",
    email: "srijoypaul199@gmail.com",
    password: "srijoy@1507",
  });
  console.log("from page", hello);

  const verified = await api.verify.verify({
    otp: 432258,
  });
  console.log("from page verfiy", verified);

  //
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Ecom <span className="text-[hsl(280,100%,70%)]">Devsnest</span> App
        </h1>
      </div>
    </main>
  );
}
