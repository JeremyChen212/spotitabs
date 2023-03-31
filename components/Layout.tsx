import Head from "next/head";
import { useRouter } from "next/router";

interface IProps {
  children: any;
  title: string;
}

export default function Layout({children, title, styles, center}) {
  const router = useRouter();
  return (
    <div className={center ? "m-auto w-fit" : ""}>
      <Head>
        <title>{title}</title>
      </Head>
      <section
        className={`w-full ${router.pathname === "/login" ? "" : "p-4"} ${styles}`}
      >
        {children}
      </section>
    </div>
  );
}
