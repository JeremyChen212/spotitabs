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
import PlaylistSection from '@component/components/ExplorePage/PlaylistSection';
import SpotifyWebApi from "spotify-web-api-js";
import { PlaylistType, SearchResults } from '../types/types'
import dynamic from 'next/dynamic'
import { cache } from 'react';
import useSWR from 'swr'
import usePlaylists from '../context/PlaylistsContext'

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

function Explore({session, serverGetStartedPlaylists, userplaylists, myGlobalVar}: any) {
    const router = useRouter()
    // const {status, data: session} = useSession();
    console.log(session)
    const {currentPlaylist} = useSpotify();
    const {overlayTab, setOverlayTab} = useSpotify();
    const { user, isLoading, isError } = usePlaylists()
    const {playlists, fetchPlaylists, test, topArtists, fetchTopArtists, topGenres, getTopGenres, getStartedPlaylists, setGetStartedPlaylists} = useSpotify();
    
    const {status: loading} = useSession();
    useEffect(() => {
      console.log(user)
        // if (topArtists.length === 0) {
        //     fetchTopArtists()
        //     console.log(topArtists.length)
        // }
        console.log(myGlobalVar)
        fetchPlaylists()
        console.log(test)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(()=>{
        console.log(getStartedPlaylists.length)
        if (getStartedPlaylists.length === 0) {
            // fetchGetStartedPlaylists()
        }
        console.log(serverGetStartedPlaylists)
        console.log(getStartedPlaylists[1]?.description)
        setGetStartedPlaylists(serverGetStartedPlaylists)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getStartedPlaylists])
    useEffect (() => {
        if(topGenres.length === 0) {
            getTopGenres()
            console.log(serverGetStartedPlaylists)
        }
        console.log(userplaylists)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  
  if (session) {
    return (
        <>
          <Toolbar></Toolbar>
          <div className='px-5 z-0 w-full'>
                <Searchbar></Searchbar>
                <PlaylistSection items={serverGetStartedPlaylists} title={"Get Started"}></PlaylistSection>
                <PlaylistSection items={userplaylists} title={"Your playlists"} showAll={"playlists"}></PlaylistSection>
            {/* <p>TASKS: 
                <br /> Create a function to search chatgpt: "out of these genres what are the most chord and guitar heavy: [topGenres]". 
               <br /> Store that into a new usestate variable.
               <br />  Then randomly pick one of those and search spotify for a playlist for that (EG: search spotify for "indie soul" + guitar) and get top playlist.
               <br /> Display that in for you section</p> */}
          </div>
        </>
    );
  } 
}

export async function getServerSideProps(context: any) {
  // VARIABLES
  const { req, res } = context;
  const session = await getSession(context);
  let serverGetStartedPlaylists:PlaylistType[] = [];
  let userplaylists:PlaylistType[] = [];
  const playlistsIds = ["4s6bQ5K4OC4abHOnS4yNVT", "0xVhalpT6uPz4z7x8q11X5", "37i9dQZF1EIefLxrHQP8p4", "37i9dQZF1DXd9rSDyQguIk", "37i9dQZF1DZ06evO0QpvRZ", "23SAT4gA6YG4rif1aWGO1q", "4oCpIPPOlpzT8sUEgErt3O", "37i9dQZF1EQp62d3Dl7ECY" ];
    // Check if the data is already cached

  
  // PROTECTED ROUTE
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } 
   const newReleases = await customGet(
    "https://api.spotify.com/v1/browse/new-releases?country=IN&limit=25",
    session
  );
  // FUNCTIONS TO GET DATA
    // Make the API call if the data is not cached
    console.log("fetching get started playlists")
    if(session) {
      try {
        const responses = await Promise.all(playlistsIds.map(playlistId =>
          customGet(
            `https://api.spotify.com/v1/playlists/${playlistId}?fields=description%2C+name%2C+id%2C+owner%2C+images`,
            session
          )
        ));
        serverGetStartedPlaylists = responses;
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await customGet(
          `https://api.spotify.com/v1/me/playlists?limit=8`,
          session
        );
        userplaylists = response.items
      } catch (error) {
        console.log(error);
      }
    };

  

    return {
      props: {
        session,
        serverGetStartedPlaylists,
        userplaylists
      },
      
    };
}



export default Explore