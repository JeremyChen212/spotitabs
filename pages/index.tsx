import {useSession, signIn, signOut} from 'next-auth/react';
import { Container, Center, Image, Button } from '@chakra-ui/react'
import * as Popover from '@radix-ui/react-popover';
import SpotitabsLogo from '/public/Spotitabs_Logo.jpg'
import requireSpotifyAuth from "../middleware";

export default function Home() {
  const {data: session} = useSession();
  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "http://localhost:3000" });
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-20 bg-[background1] text-white">
        Signed in as {session?.token?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } 
  return (
    <div className="flex column">
    <Image
      src='/public/Spotitabs_Logo.jpg'
      alt="spotify logo"
    />
    <Button
      size='lg' width="100%"
      onClick={handleLogin}
    >
      Login
    </Button>
  </div>
  )
}