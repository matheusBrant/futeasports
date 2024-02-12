import { Header } from "@/components/Header";
import { SideMenu } from "@/components/SideMenu";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { useState } from "react";
import { Menu } from 'react-feather';

export default function Home() {
  const [sideMenuVisible, setSideMenuVisible] = useState(true);

  return (
    <>
      <Head>
        <title>Futeasports</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen items-center justify-center bg-gradient-to-br from-cyan-100 to-cyan-600">
        <Button className="absolute left-48 top-0 bg-transparent w-16 h-14 hover:bg-transparent" 
          onClick={() => setSideMenuVisible(!sideMenuVisible)} >
          <Menu size={24} /> 
        </Button>
        <Header />
        {sideMenuVisible && (
          <SideMenu path="/get-player">Comparar jogador</SideMenu>
        )}
      </main>
    </>
  );
}