import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "http://localhost:3000/" });
  };

  return (
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-20 bg-[background1]">
        <Image
          src="/public/images/spotitabs_logo.png"
          alt="spotify logo"
          width={320}
          height={96}
          objectFit="contain"
        />
        <button
          className="flex px-12 py-2 text-lg text-white from-spotifygreen tracking-widest uppercase rounded-full focus:outline-none bg-spotifygreen hover:bg-opacity-50 transition-all"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
  );
}
