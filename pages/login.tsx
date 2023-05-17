import Image from "next/image";
import { getProviders, getSession, signIn } from "next-auth/react";
export default function Login( { providers }: any) {
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "https://spotitabs.vercel.app/" });
  };

  return (
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-20 bg-[background1]">
        <Image className="object-fit w-[30rem] h-auto"
          src="/images/Spotitabs_Logo.png"
          alt="spotify logo"
          width={320}
          height={96}
          priority
        />
          <div >
          <button
            className="flex px-12 py-2 text-lg text-white from-spotifygreen tracking-widest uppercase rounded-full focus:outline-none bg-spotifygreen hover:bg-opacity-50 transition-all"
            onClick={() => handleLogin()}
          >
            Login
          </button>
          </div>
        
      </div>
  );
}

export async function getServerSideProps(context)  {
  const session = await getSession(context);
    if (session) {
      return {
        redirect: {
          destination: "/search",
          permanent: false,
        },
      };
    } 
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}