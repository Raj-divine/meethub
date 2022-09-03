import type { NextPage } from "next";
import Head from "next/head";
import {
  HeroSection,
  InfoSection,
  TestimonialSection,
} from "../components/LandingPage";
const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Meethub</title>
      </Head>
      <HeroSection />
      <InfoSection />
      <TestimonialSection />
    </>
  );
};

export default Landing;
