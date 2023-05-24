import { useRouter } from "next/router";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from "@component/lib/window";

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

  // {window.width}
  return (
    <div className={`min-h-[100vh] w-full box-border items-start h-fit grid grid-rows-[max-content] text-white`}>
      <div className="px-8"> 
        <Navbar></Navbar>
        <AnimatePresence>
          <motion.main
            variants={variants} // Pass the variant object into Framer Motion 
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: 'linear', delay: 0.2 }} // Set the transition to linear
            className="w-full"
          >
            <div className="sm:mt-[4rem] pt-6">
              {children}
            </div>
          </motion.main>
        </AnimatePresence>
        </div>
    </div>
  );
}
