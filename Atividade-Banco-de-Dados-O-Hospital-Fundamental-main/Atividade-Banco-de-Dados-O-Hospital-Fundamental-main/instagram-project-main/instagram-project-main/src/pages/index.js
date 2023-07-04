import Head from "next/head";

import Activity from "../components/activity";
import SideBar from "../components/side-bar";

export default function Main() {
  return (
    <>
      <Head>
        <title>Instagram</title>
      </Head>
      <SideBar />
      <main className="max-md:mt-16 sm:grid sm:place-content-center">
        <Activity />
      </main>
    </>
  );
}
