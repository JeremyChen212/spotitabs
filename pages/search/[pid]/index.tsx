import { useRouter } from "next/router"
import { getSession, useSession } from 'next-auth/react';
import { GetSessionParams } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { customGet } from "@component/utils/customGet";
import Layout from "@component/components/Layout";
import Head from "next/head";
import Toolbar from '@component/components/Toolbar';
import Searchbar from "@component/components/Searchbar";
import url from 'url';

export default function SearchResults({session, searchResults}) {
    const router = useRouter()
    const { pid } = router.query
    const tracks = searchResults.tracks;
    // const [searchResults, setSearchResults] = useState()
    useEffect(()=>{
      async function searchSpotify() {
        const searchResponse = await fetch("api/search")
        // setSearchResults(searchResponse)
      }
      console.log(tracks)
    , [searchResults]})
    
    return (
      <>
      <Layout>
      <Head>
        <title>Explore | Spotitabs</title>
        <meta name='description' content='Find guitar tabs and chords for your favorite songs and playlists on Spotify. Our search tool allows you to easily find and learn guitar chords for any track or playlist. Start playing your favorite tunes today with our comprehensive library of chords and tabs. Search by song title, artist name, or browse our extensive selection of tunes made for you. Join our community of guitar enthusiasts and take your playing to the next level with our easy-to-use guitar tab and chord search tool.' />
      </Head>
        <Toolbar></Toolbar>
        <div className='z-0 w-full'>
            <Searchbar></Searchbar>
            <div id="songsSection">
              {tracks.items.map((track: any, index: any)=>(
                <div key={index}>{track.name}</div>
              ))}
            </div>
        </div>
      </Layout>
      </>
    )
}


export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const { params } = context;
    const { pid } = params;
    // console.log("path=" + path)
    const searchResults = await customGet(
      `https://api.spotify.com/v1/search?q=${pid}&market=from_token&type=album,track,artist,playlist&limit=50`,
      session
    );
    return {
      props: {
        session,
        searchResults
      },
    };
  }
  