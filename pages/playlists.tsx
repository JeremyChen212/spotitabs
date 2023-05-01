// import {useSession, signIn, signOut, } from 'next-auth/react';
// import { getSession, GetSessionParams } from 'next-auth/react'
// import { useRouter } from 'next/router';
// import { Container, Center, Button } from '@chakra-ui/react'
// import * as Popover from '@radix-ui/react-popover';
// import SpotitabsLogo from '/public/Spotitabs_Logo.jpg'
// import PlaylistDashboard from '../components/PlaylistDashboard';
// import { getUsersPlaylists } from '../lib/spotify'
// import { GetServerSideProps } from "next";
// import { useEffect } from 'react';
// import { useSpotify } from '../context/SpotifyContext'
// import { customGet } from '@component/utils/customGet';
// import axios from 'axios';
// import SearchInput from '@component/components/SearchInput';
// import Loader from '../components/Loader'
// import Navbar from '@component/components/Navbar';
// import Heading from '@component/components/Heading';
// import leafyshoe from "../public/images/shoebg.jpeg"
// import Image from 'next/image'


// function Home({session}) {
//   const router = useRouter()
//   // const {status, data: session} = useSession();
 
  
//     return (
//       <div className={`mx-8 items-center flex flex-col gap-5 text-white`}>
//         <Navbar></Navbar>
//         <Heading className={"z-10"} text={"My Playlists"} />
//       </div>
//     );
// }

// export async function getServerSideProps(context: GetSessionParams | undefined) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//     },
//   };
// }

// export default Home

import {useSession, signIn, signOut, } from 'next-auth/react';
import { getSession, GetSessionParams } from 'next-auth/react'
import { useRouter } from 'next/router';
import { Container, Center, Button } from '@chakra-ui/react'
import * as Popover from '@radix-ui/react-popover';
import SpotitabsLogo from '/public/Spotitabs_Logo.jpg'
import PlaylistDashboard from '../components/PlaylistDashboard';
import { getUsersPlaylists } from '../lib/spotify'
import { GetServerSideProps } from "next";
import { useEffect, useState } from 'react';
import { useSpotify } from '../context/SpotifyContext'
import { customGet } from '@component/utils/customGet';
import axios from 'axios';
import SearchInput from '@component/components/SearchInput';
import Loader from '../components/Loader'
import Navbar from '@component/components/Navbar';
import Heading from '@component/components/Heading';
import leafyshoe from "../public/images/shoebg.jpeg"
import Image from 'next/image'
import OverlayTab from '@component/components/OverlayTab';
import YourPlaylists from '@component/components/overlays/YourPlaylists';
import MainOverlay from '@component/components/overlays/MainOverlay'
import Icon from '@component/components/reusable/Icon';
import Toolbar from '@component/components/Toolbar';
function Home({session}) {
  const router = useRouter()
  // const {status, data: session} = useSession();
  console.log(session)
  const { accessToken } = session
  const {currentPlaylist} = useSpotify();
  const {overlayTab, setOverlayTab} = useSpotify();
  const [commandDown, setCommandDown] = useState(false)
  const [jDown, setJDown] = useState(false)
  useEffect(() => {
    document.addEventListener("keydown", function(e) {
      if(event.metaKey) {
        setCommandDown(true)
      } 
      if(event.metaKey && e.key === "k") {
        setJDown(true)
      } 
    })
    document.addEventListener("keyup", function(e) {
      setCommandDown(false)
      setJDown(false)
    })
    // setOverlayTab("playlists")
  })
  // if(status === "loading") {
  //   console.log("loading")
  //   return <Loader />
  // }
  const {status: loading} = useSession();

  
  
  // useEffect(() => {
  //   console.log(session)
  //   // Redirect to login page if session is expired or missing tokens
  //   if (!loading && (!session || !session.accessToken || !session.refreshToken)) {
  //     router.push('/login');
  //   }
  // }, [session, loading, router]);
    
  // // Redirect to home page after logging in
  // useEffect(() => {
  //   if (!loading && session && session.accessToken && session.refreshToken) {
  //     router.push('/');
  //   }
  // }, [session, loading, router]);


  if (session) {
    return (
      <div className={`max-w-[1800px] min-h-[100vh] m-auto  mx-6 items-start h-fit flex flex-col text-white`}>
          <Navbar></Navbar>
          <Toolbar></Toolbar>
          <div className='text-center flex flex-col h-fit mx-auto w-full m-auto w-fit'>
            <Heading text={'Your Playlists'}></Heading>
            <PlaylistDashboard></PlaylistDashboard>
          </div>
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

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
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


export default Home