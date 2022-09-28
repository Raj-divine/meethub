import { NextPage } from "next";
import Head from "next/head";
import AppLoader from "../../components/AppLoader/AppLoader";
import { useUser } from "../../hooks";
import { useEffect } from "react";
import Router from "next/router";

const Meetups: NextPage = () => {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!user && !loading) Router.replace("/");
  }, [user]);

  return (
    <>
      <Head>
        <title>All Meetups</title>
      </Head>
      {loading && <AppLoader />}
      {user && !loading && (
        <>
          <div style={{ marginTop: "60px" }}>this is the meetups page</div>
        </>
      )}
    </>
  );
};

export default Meetups;
