import { useRouter } from "next/router";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from "@component/lib/window";
import { useEffect, useState } from "react";

interface IProps {
  children: any;
  title: string;
}
const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}
export default function Layout({children}: any) {
  const router = useRouter();
  const { asPath } = useRouter();
  const windowSize = useWindowSize()
  useEffect(()=>{
    console.log(router.pathname)
    if(router.pathname === "/playlist/[pid]") {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "overlay"
      console.log("overlay")
    }
  }, [router.pathname])

  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Command (Mac) or Control (Windows) key and 'k' key are pressed
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        router.push('/search'); // Redirect to the search page
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
        router.push('/playlists'); // Redirect to the search page
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // {window.width}
  return (
    <div className={`min-h-[100vh] px-6 w-full box-border items-start h-fit grid grid-rows-[max-content] text-white`}>
        <Navbar></Navbar>
        <AnimatePresence>
          <motion.main
            variants={variants} // Pass the variant object into Framer Motion 
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: 'linear', delay: 0.2 }} // Set the transition to linear
            className="w-full min-h-[100vh] flex h-full flex-col"
          >
            <div className="sm:mt-[4rem] flex flex-col h-full pt-6">
              {children}
            </div>
          </motion.main>
        </AnimatePresence>
        </div>
  );
}
