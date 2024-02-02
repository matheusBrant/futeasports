/* eslint-disable @next/next/no-img-element */
import { currentUser } from "@clerk/nextjs";
import { unstable_noStore as noStore } from "next/cache";

import { api } from "~/trpc/server";

import { UserButton } from "@clerk/nextjs";
import { type Player } from "~/trpc/models";
 
export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const user = await currentUser()
  
  return (
    <>
      <header>
        <div className="flex justify-end items-center p-2 bg-purple-200">
          <h1 className="mr-4">{user?.firstName} {user?.lastName}</h1><UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8 ">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>

        <CrudShowcase />
      </div>
    </main>
    </>
  );
}

async function CrudShowcase() {
  const taller = await api.player.getTaller.query() as Player;
  const smaller = await api.player.getSmaller.query() as Player;

  return (

      <div className="grid grid-cols-2 gap-4">
        <div className="flex-col items-center justify-center">
          <div className="text-center">
          {taller ? (
            <p className="truncate">Taller player: {taller.name}</p>
          ) : (
            <p>You have no posts yet.</p>
          )}
          </div>
          <div className="pt-1 flex justify-center items-center">
            <img src={taller.shieldUrl} alt="Imagem" width={100} height={50}/>
          </div>
        </div>
        <div className="flex-col items-center justify-center">
          <div className="text-center">
          {taller ? (
            <p className="truncate">Smaller player: {smaller.name}</p>
          ) : (
            <p>You have no posts yet.</p>
          )}
          </div>
          <div className="pt-1 flex justify-center items-center">
            <img src={smaller.shieldUrl} alt="Imagem" width={100} height={50}/>
          </div>
        </div>
      </div>
  );
}