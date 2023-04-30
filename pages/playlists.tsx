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


function Explore({session, serverGetStartedPlaylists}) {
    const router = useRouter()
    // const {status, data: session} = useSession();
    console.log(session)
    const { accessToken } = session
    const {currentPlaylist} = useSpotify();
    const {overlayTab, setOverlayTab} = useSpotify();
    const {playlists, fetchPlaylists, topArtists, fetchTopArtists, topGenres, getTopGenres, getStartedPlaylists, fetchGetStartedPlaylists} = useSpotify();
    const {status: loading} = useSession();
    useEffect(() => {
        if (topArtists.length === 0) {
            fetchTopArtists()
            console.log(topArtists.length)
        }
        fetchPlaylists()
    }, []);
    useEffect(()=>{
        console.log(getStartedPlaylists.length)
        if (getStartedPlaylists.length === 0) {
            // fetchGetStartedPlaylists()
        }
        console.log(getStartedPlaylists)
        console.log(getStartedPlaylists[1]?.description)
    }, [getStartedPlaylists])
    useEffect (() => {
        if(topGenres.length === 0) {
            getTopGenres()
            console.log(serverGetStartedPlaylists)
        }
    }, [])
  
  
  if (session) {
    return (
      <div className={`min-h-[100vh] m-auto  mx-6 items-start h-fit flex flex-col text-white`}>
          <MainOverlay></MainOverlay>
          <Navbar></Navbar>
          <Toolbar></Toolbar>
        <PlaylistDashboard></PlaylistDashboard>
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
  let serverGetStartedPlaylists = []
  const playlistsIds = ["4s6bQ5K4OC4abHOnS4yNVT", "0xVhalpT6uPz4z7x8q11X5", "37i9dQZF1EIefLxrHQP8p4", "37i9dQZF1DXd9rSDyQguIk", "2CtbFy5I7LxvXk3pqk77AO", "23SAT4gA6YG4rif1aWGO1q", "4oCpIPPOlpzT8sUEgErt3O", "37i9dQZF1EQp62d3Dl7ECY" ];
  if(session) {
    try {
      const responses = await Promise.all(playlistsIds.map(playlistId =>
        axios({
          method: 'get',
          url: `https://api.spotify.com/v1/playlists/${playlistId}`,
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          }
        }).then(response => response.data)
      ));
        serverGetStartedPlaylists = responses;
        } catch (error) {
        console.log(error);
        }
    };

    return {
      props: {
        session,
        serverGetStartedPlaylists
      },
    };
}



export default Explore