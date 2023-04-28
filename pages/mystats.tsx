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
import { IoChevronBack } from 'react-icons/io5';
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
import Toolbar from '@component/components/Toolbar'
import PlaylistCard from '../components/reusable/PlaylistCard';
import Searchbar from '@component/components/Searchbar';
import GetStarted from '@component/components/GetStarted';

function Home({session}) {
  const router = useRouter()
  const { accessToken } = session
  const {currentPlaylist} = useSpotify();
  const {topArtists, fetchTopArtists, topGenres, getTopGenres} = useSpotify();

  const {status: loading} = useSession();
  useEffect(() => {
    if (topArtists.length === 0) {
        fetchTopArtists()
        console.log(topArtists.length)
    }
    
   
}, []);
useEffect (() => {
  if(topGenres.length === 0) {
    getTopGenres()
    console.log(topGenres)
    }
  }, [topGenres])

  

  if (session) {
    return (
      <div className={`min-h-[100vh] m-auto  mx-6 items-start h-fit flex flex-col text-white`}>
          <div onClick={()=>router.back()} className='cursor-pointer bg-[#ffffff19] p-2 rounded-full mt-6'>
                <IoChevronBack className='w-6 h-6 m-auto '></IoChevronBack>
          </div>
          {/* <MainOverlay></MainOverlay> */}
          {/* <Navbar></Navbar> */}
          {/* <Toolbar></Toolbar> */}
          <div className='px-5 w-full'>
                <h1 className="text-center text-[5rem] mb-10">YOUR STATS</h1>
                <div className='w-full justify-around flex'>
                    <div>
                        <h1 className="text-[1.5rem] underline mb-4">Top Artists ({topArtists.length})</h1>
                        {topArtists.map((artist, index) => (
                            <h1>{artist.name}</h1>
                        ))}
                    </div>
                    <div>
                        <h1 className="text-[1.5rem] underline mb-4">Top Genres ({topGenres.length})</h1>
                        {topGenres.map((genre, index) => (
                            <h1>{genre}</h1>
                        ))}
                    </div>
                </div>
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