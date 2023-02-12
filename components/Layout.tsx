import React from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { pageTransition } from "./animations/variants";
type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <motion.div
        className="flex flex-col items-center min-h-screen"
        {...pageTransition}
      >
        <Header />
        {children}
      </motion.div>
    </>
  );
};

export default Layout;
