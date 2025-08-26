import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import "@/styles/globals.css";                 
import ScrollToTopButton from "@/components/ScrollToTopButton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ScrollToTopButton />
    </>
  );
}

export default appWithTranslation(MyApp);
