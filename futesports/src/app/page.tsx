/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
// import { unstable_noStore as noStore } from "next/cache";

import { UserButton, currentUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { type Player } from "~/trpc/models";
import { api } from "~/trpc/server";

const Home: NextPage = async () => {  
  // noStore();
  const user = await currentUser()
  const getPlayer = await api.player.getByName.query({ name: 'Lionel Messi' }) as Player;

  return (
    <>
      <header>
        <div className="flex justify-end items-center pr-6 p-3 bg-purple-200">
          <h1 className="mr-4">{user?.firstName} {user?.lastName}</h1><UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8 ">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Get Player</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Show player</CardTitle>
                    <CardDescription>Insert player name</CardDescription>
                      <Input placeholder="Name"  type="text"/>
                      <Button>Button</Button>
                  </CardHeader>
                  <div className="m-5 flex justify-center items-center">
                    <img src={getPlayer[0].shieldUrl} alt="Imagem" width={100} height={50}/>
                  </div>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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

    <div>
      <div className="text-center"> Showroom
      </div>
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
          {smaller ? (
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
    </div>
  );
}

export default Home;