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
import SongCard from "@component/components/reusable/SongCard";

export default function SearchResults({session, searchResults}) {
    const router = useRouter()
    const { pid } = router.query
    const tracks = searchResults.tracks;
    // const [searchResults, setSearchResults] = useState()
    useEffect(()=>{
      console.log(tracks)
      async function searchSpotify() {
        const searchResponse = await fetch("api/search")
        // setSearchResults(searchResponse)
      }
      console.log(tracks)
    , [searchResults]})
    function handleSearch(searchQuery) {
      // setSearchQuery(event.target.value)
      router.push(`/search/${searchQuery}`)
    }
    return (
      <>
      <Layout>
      <Head>
        <title>Search results for {pid} | Spotitabs</title>
        <meta name='description' content='Find guitar tabs and chords for your favorite songs and playlists on Spotify. Our search tool allows you to easily find and learn guitar chords for any track or playlist. Start playing your favorite tunes today with our comprehensive library of chords and tabs. Search by song title, artist name, or browse our extensive selection of tunes made for you. Join our community of guitar enthusiasts and take your playing to the next level with our easy-to-use guitar tab and chord search tool.' />
      </Head>
        <Toolbar></Toolbar>
        <div className='z-0 h-full w-full'>
            <Searchbar searchFunc={handleSearch}></Searchbar>
            <div id="songsSection" className="relative h-full">
              {tracks.items.length > 0 ? (
                <>
                {tracks.items.map((track: any, index: any)=>(
                  <SongCard song={track} key={index}></SongCard>
                ))}
                </>
              ) : (
                <h1 className="text-center absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-xl font-medium">
                  Sorry. No Results.
                </h1>
              )}
              
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
  