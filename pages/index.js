import Head from "next/head";
import { Inter } from "next/font/google";
import SearchCity from "../components/SearchCity";
import Image from "next/image";
import weathermate from "../public/img/Logo wheathermate.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={
          inter.className +
          " flex flex-col justify-center items-center h-screen"
        }
      >
        <Image src={weathermate} className="w-[150px] mb-4" draggable="false" />
        <SearchCity />
      </main>
    </>
  );
}