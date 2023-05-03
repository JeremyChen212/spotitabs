import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
interface IProps {
  children: any;
  title: string;
}

export default function Layout({children}: any) {
  const router = useRouter();
  return (
    <div className={"min-h-[100vh] m-auto  mx-6 items-start h-fit flex flex-col text-white"}>
      <Navbar></Navbar>
      
      {children}
    </div>
  );
}
