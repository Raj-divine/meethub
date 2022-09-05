import type { NextPage } from "next";
import Head from "next/head";
import {
  HeroSection,
  InfoSection,
  SectionSignUp,
  TestimonialSection,
} from "../components/LandingPage";
const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Meethub</title>
        <meta
          name="description"
          content="Meethub is the best platform for finding meetups near you"
        />
      </Head>
      <HeroSection />
      <InfoSection />
      <TestimonialSection />
      <SectionSignUp />
    </>
  );
};

export default Landing;
