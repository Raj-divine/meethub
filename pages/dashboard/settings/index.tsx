import type { NextPage } from "next";
import Head from "next/head";
import { useUser } from "../../../hooks";
import AppLoader from "../../../components/AppLoader/AppLoader";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainProfile } from "../../../components/ProfilePage";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  DetailsSection,
  PasswordSection,
} from "../../../components/DashboardPage";

const DashBoardSettings: NextPage = () => {
  const { user, loading } = useUser();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const router = useRouter();
  const { currentUser } = getAuth();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user]);
  const getUserData = async () => {
    if (currentUser) {
      setIsUserLoading(true);

      const userSnapshot = await getDoc(doc(db, "users", currentUser.uid));
      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
      } else {
        setUserData(null);
      }
      setIsUserLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>Your Profile</title>
      </Head>
      {(loading || isUserLoading || !userData) && <AppLoader />}
      {user && !loading && userData && !isUserLoading && (
        <>
          <MainProfile user={userData} />
          <PasswordSection />
          <DetailsSection user={userData} getUserData={getUserData} />
        </>
      )}
    </>
  );
};

export default DashBoardSettings;
