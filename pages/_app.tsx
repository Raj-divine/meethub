import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import store from "../context/store";
import { Provider } from "react-redux";
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
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}

export default MyApp;
