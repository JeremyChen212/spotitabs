import { useRouter } from "next/router";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className={"min-h-[100vh] p-2 mx-6 items-start h-fit grid grid-rows-[max-content] text-white"}>
      <Navbar></Navbar>
      <AnimatePresence>
	      <motion.main
	        variants={variants} // Pass the variant object into Framer Motion 
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: 'linear', delay: 0.2 }} // Set the transition to linear
          className=""
	      >
          {children}
	      </motion.main>
        </AnimatePresence>
    </div>
  );
}
