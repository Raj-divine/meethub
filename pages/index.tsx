import type { NextPage } from "next";
import Head from "next/head";
import {
  HeroSection,
  InfoSection,
  SectionSignUp,
  SignUpModal,
  TestimonialSection,
} from "../components/LandingPage";
import { useSelector } from "react-redux";

interface ModalState {
  modal: {
    isOpen: boolean;
    loggingIn: boolean;
  };
}

const Landing: NextPage = () => {
  const { isOpen, loggingIn } = useSelector((state: ModalState) => state.modal);

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
      <SignUpModal loggingIn={loggingIn} isOpen={isOpen} />
    </>
  );
};

export default Landing;
