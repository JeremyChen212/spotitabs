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
import Toolbar from '@component/components/Toolbar'
import PlaylistCard from '../components/reusable/PlaylistCard';
import Searchbar from '@component/components/Searchbar';
import GetStarted from '@component/components/ExplorePage/GetStarted';


async function getRecomendedPlaylistBasedOnGenre(topGenres) {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(`out of these genres what are the most chord and guitar heavy: ${topGenres}`),
      });
    const data = await response.json();
    console.log(data)
}


function Explore({session, data}) {
    const router = useRouter()
    // const {status, data: session} = useSession();
    console.log(session)
    const { accessToken } = session
    const {currentPlaylist} = useSpotify();
    const {overlayTab, setOverlayTab} = useSpotify();


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
            console.log(data)
        }
            // getRecomendedPlaylistBasedOnGenre(topGenres)
        // for(var i = 0; i < topGenres.length; i++) {
        //     getRecomendedPlaylistBasedOnGenre(topGenres[i])
        // }
    }, [])
  
  
  if (session) {
    return (
      <div className={`min-h-[100vh] m-auto  mx-6 items-start h-fit flex flex-col text-white`}>
          <MainOverlay></MainOverlay>
          <Navbar></Navbar>
          <Toolbar></Toolbar>
          <div className='px-5 w-full'>
            <Searchbar></Searchbar>
            <div>
              <Heading text={"Get Started"}></Heading>
              <GetStarted></GetStarted>
              <PlaylistCard playlistImage={'https://mosaic.scdn.co/640/ab67616d0000b273795e7069de7cb188b7c821b4ab67616d0000b2738940ac99f49e44f59e6f7fb3ab67616d0000b2738b52c6b9bc4e43d873869699ab67616d0000b273aa95a399fd30fbb4f6f59fca'}
              playlistTitle={"R&B Mix"} artistPreview={"Jordan Ward, Bruno Major, and more"}></PlaylistCard>
            </div>

            <p>TASKS: 
                <br /> Create a function to search chatgpt: "out of these genres what are the most chord and guitar heavy: [topGenres]". 
               <br /> Store that into a new usestate variable.
               <br />  Then randomly pick one of those and search spotify for a playlist for that (EG: search spotify for "indie soul" + guitar) and get top playlist.
               <br /> Display that in for you section</p>
          </div>
         
      </div>
    );
  } 
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

    const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(`out of these genres what are the most chord and guitar heavy: rock, blues, edm, hiphop, rnb`),
    });
    const data = await response.json();

  
  return {
    props: {
      session,
      data
    },
  };
}


export default Explore