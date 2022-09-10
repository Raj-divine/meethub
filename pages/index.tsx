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
import AppLoader from "../components/AppLoader/AppLoader";
import { useUser } from "../hooks";
interface ModalState {
  modal: {
    isOpen: boolean;
    loggingIn: boolean;
  };
}

const Landing: NextPage = () => {
  const { isOpen, loggingIn } = useSelector((state: ModalState) => state.modal);

  const { user, loading } = useUser("/home");

  return (
    <>
      <Head>
        <title>Meethub</title>
        <meta
          name="description"
          content="Meethub is the best platform for finding meetups near you"
        />
      </Head>
      {!user && !loading && (
        <>
          <HeroSection />
          <InfoSection />
          <TestimonialSection />
          <SectionSignUp />
          <SignUpModal loggingIn={loggingIn} isOpen={isOpen} />
        </>
      )}
      {!user && loading && <AppLoader />}
    </>
  );
};

export default Landing;
