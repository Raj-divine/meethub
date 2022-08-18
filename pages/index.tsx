import type { NextPage } from "next";
import Head from "next/head";
import { HeroSection } from "../components/LandingPage";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Meethub</title>
      </Head>
      <div>
        <p>Home page</p>
      </div>
      <HeroSection />
    </>
  );
};

export default Home;
