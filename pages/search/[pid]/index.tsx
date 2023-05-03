import { useRouter } from "next/router"
import { getSession } from 'next-auth/react';
import { GetSessionParams } from "next-auth/react";
export default function SearchResults() {
    const router = useRouter()
    const { pid } = router.query
    
    return (
        <div>
            <h1 className="text-xl text-white inline-block mb-5">
                Results for {pid}
            </h1>
        </div>
    )
}


export async function getServerSideProps(context: GetSessionParams | undefined) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {
        session,
      },
    };
  }
  