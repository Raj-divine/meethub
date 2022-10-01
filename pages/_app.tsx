import "../styles/globals.css";
import "../styles/global.scss";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import store from "../context/store";
import { Provider } from "react-redux";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import Footer from "../components/Footer/Footer";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";

//this is just to call the firebase config and avoid any errors
const db = getFirestore(app);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif",
        headings: { fontFamily: "Montserrat, sans-serif" },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Provider store={store}>
        <SideNavbar />
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </Provider>
    </MantineProvider>
  );
}

export default MyApp;
