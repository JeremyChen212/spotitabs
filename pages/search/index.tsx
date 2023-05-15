import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSpotify } from '../../context/SpotifyContext';
import { customGet } from '@component/utils/customGet';
import Toolbar from '@component/components/Toolbar';
import Searchbar from '@component/components/Searchbar';
import GetStartedSection from '@component/components/ExplorePage/GetStartedSection';
import PlaylistSection from '@component/components/ExplorePage/PlaylistSection';
import { PlaylistType } from '../../types/types';
import useSWR from 'swr'
import Head from 'next/head'
import Layout from '@component/components/Layout';
import SplineObject1 from '@component/components/SplineObject1';

async function getRecomendedPlaylistBasedOnGenre(topGenres: any) {
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
    const {playlists, fetchPlaylists, topArtists, fetchTopArtists, topGenres, getTopGenres, getStartedPlaylists, fetchGetStartedPlaylists} = useSpotify();
    
    const {status: loading} = useSession();
    useEffect(() => {
        // if (topArtists.length === 0) {
        //     fetchTopArtists()
        //     console.log(topArtists.length)
        // }
        console.log(getStartedPlaylists)
        fetchPlaylists()
        fetchGetStartedPlaylists()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(()=>{
        // setGetStartedPlaylists(serverGetStartedPlaylists)
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
  if (playlists) {
    return (
        <Layout>
        <Head>
          <title>Explore | Spotitabs</title>
          <meta name='description' content='Find guitar tabs and chords for your favorite songs and playlists on Spotify. Our search tool allows you to easily find and learn guitar chords for any track or playlist. Start playing your favorite tunes today with our comprehensive library of chords and tabs. Search by song title, artist name, or browse our extensive selection of tunes made for you. Join our community of guitar enthusiasts and take your playing to the next level with our easy-to-use guitar tab and chord search tool.' />
        </Head>
          <Toolbar></Toolbar>
          <div className='z-0 w-full'>
              {/* <h1 className="text-center text-[4rem] font-normal py-4">EXPLORE</h1> */}
                <Searchbar></Searchbar>
                <GetStartedSection bigCard={true} items={getStartedPlaylists} title={"Get Started"} ></GetStartedSection>
                <PlaylistSection items={playlists} title={"Your playlists"} showAll={"playlists"}></PlaylistSection>
            {/* <p>TASKS: 
                <br /> Create a function to search chatgpt: "out of these genres what are the most chord and guitar heavy: [topGenres]". 
               <br /> Store that into a new usestate variable.
               <br />  Then randomly pick one of those and search spotify for a playlist for that (EG: search spotify for "indie soul" + guitar) and get top playlist.
               <br /> Display that in for you section</p> */}
          </div>
        </Layout>
    );
  } else {
    return (
      <>
        <Toolbar></Toolbar>
        <div className=' z-0 w-full'>
              <Searchbar></Searchbar>
              loading
              {/* <PlaylistSection items={serverGetStartedPlaylists} title={"Get Started"} ></PlaylistSection>
              <PlaylistSection items={userplaylists} title={"Your playlists"} showAll={"playlists"}></PlaylistSection> */}
        </div>
      </>
  );
  }
}

export async function getServerSideProps(context: any) {
  // VARIABLES
  const { req, res } = context;
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const session = await getSession(context);
  let serverGetStartedPlaylists:PlaylistType[] = [];
  let userplaylists:PlaylistType[] = [];

  return {
    props: {
      session,
      serverGetStartedPlaylists,
      userplaylists
    },
    
  };
}



export default Explore