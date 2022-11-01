import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "../../../hooks";
import AppLoader from "../../../components/AppLoader/AppLoader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  MainProfile,
  PastEvents,
  UpcomingEvents,
} from "../../../components/ProfilePage";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const Profile: NextPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    const getUserData = async () => {
      setIsUserLoading(true);
      const userSnapshot = await getDoc(
        doc(db, "users", `${router.query.userId}`)
      );
      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
        setIsUserLoading(false);
      } else {
        setUserData(null);
        setIsUserLoading(false);
        router.replace("/not-found");
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <Head>
        <title>Meethub | Home</title>
      </Head>
      {(loading || isUserLoading || !userData) && <AppLoader />}
      {user && !loading && userData && !isUserLoading && (
        <>
          <MainProfile user={userData} />
          <UpcomingEvents user={userData} />
          <PastEvents user={userData} />
        </>
      )}
    </>
  );
};

export default Profile;
