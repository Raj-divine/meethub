import { NextPage } from "next";
import Head from "next/head";
import AppLoader from "../../components/AppLoader/AppLoader";
import { useUser } from "../../hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Header, MeetupForm } from "../../components/HostMeetupPage";

const HostMeetup: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) router.replace("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>Host A Meetup</title>
      </Head>
      {loading && <AppLoader />}
      {user && !loading && (
        <>
          <Header />
          <MeetupForm />
        </>
      )}
    </>
  );
};

export default HostMeetup;
