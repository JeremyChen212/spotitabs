import {useSession, signIn, signOut} from 'next-auth/react';
import { useRouter } from 'next/router';
import { Container, Center, Image, Button } from '@chakra-ui/react'
import * as Popover from '@radix-ui/react-popover';
import SpotitabsLogo from '/public/Spotitabs_Logo.jpg'
import PlaylistDashboard from '../components/PlaylistDashboard';
import { getSession } from "next-auth/react";
import { getUsersPlaylists } from '../lib/spotify'
import { GetServerSideProps } from "next";
import { useEffect } from 'react';
import { useSpotify } from '../context/SpotifyContext'
import { customGet } from '@component/utils/customGet';

function Home( {} ) {
  const {data: session} = useSession();
  const {status: loading} = useSession();
  const router = useRouter();

  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "http://localhost:3000/" });
  };
  
  useEffect(() => {
    // Redirect to login page if session is expired or missing tokens
    if (!loading && (!session || !session.accessToken || !session.refreshToken)) {
      router.push('/login');
    }
  }, [session, loading, router]);
    
  // Redirect to home page after logging in
  useEffect(() => {
    if (!loading && session && session.accessToken && session.refreshToken) {
      router.push('/');
    }
  }, [session, loading, router]);


  if (session) {
    return (
      <div className="flex flex-col items-center justify-center gap-20 text-white">
        Signed in as {session?.token?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <PlaylistDashboard ></PlaylistDashboard>
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getSession(ctx);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   const newReleases = await customGet(
//     "https://api.spotify.com/v1/browse/new-releases?country=IN&limit=25",
//     session
//   );

//   const featuredPlaylists = await customGet(
//     "https://api.spotify.com/v1/browse/featured-playlists?country=IN",
//     session
//   );

//   return { props: { newReleases, featuredPlaylists } };
// };

export default Home