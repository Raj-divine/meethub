import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "../../hooks";
import AppLoader from "../../components/AppLoader/AppLoader";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { AllBookmarkMeetups } from "../../components/BookmarkPage";

const Home: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Meethub | Bookmarks</title>
      </Head>
      {loading && <AppLoader />}
      {user && !loading && (
        <>
          <AllBookmarkMeetups />
        </>
      )}
    </>
  );
};

export default Home;
