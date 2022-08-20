import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
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
      <Navbar />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
