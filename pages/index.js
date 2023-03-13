import Head from "next/head";
import { Inter } from "next/font/google";
import Image from "next/image";
import weathermate from "../public/img/Logo wheathermate.svg";
import Content from "../components/Content";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>WeatherMate</title>
        <meta name="description" content="WeatherMate - see the weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={
          inter.className +
          " flex flex-col justify-center items-center h-screen"
        }
      >
        <Image
          src={weathermate}
          className="w-[150px] mb-2"
          draggable="false"
          alt="weathermatelogo"
        />
        <Content />
      </main>
    </>
  );
}
