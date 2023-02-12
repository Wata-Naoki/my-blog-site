import "../styles/globals.scss";
import { Layout } from "../components";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimatePresence>
  );
}
