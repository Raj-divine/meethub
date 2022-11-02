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
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
interface ModalState {
  modal: {
    isOpen: boolean;
    loggingIn: boolean;
  };
}

const Landing: NextPage = () => {
  const { isOpen, loggingIn } = useSelector((state: ModalState) => state.modal);
  const auth = getAuth();
  const { user, loading } = useUser("/home");
  const router = useRouter();
  useEffect(() => {
    if (user && !loading) {
      router.replace("/home");
    }
  }, []);
  useEffect(() => {
    signOut(auth).then((res) => console.log("logged out"));
  }, []);

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
