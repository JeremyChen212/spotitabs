import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { customGet } from '@component/utils/customGet';
import Toolbar from '@component/components/Toolbar';
import Searchbar from '@component/components/Searchbar';
import PlaylistSection from '@component/components/ExplorePage/PlaylistSection';
import { PlaylistType } from '../types/types';
import useSWR from 'swr'
import Head from 'next/head'

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
        <>
        <Head>
          <title>Explore | Spotitabs</title>
          <meta name='description' content='Find guitar tabs and chords for your favorite songs and playlists on Spotify. Our search tool allows you to easily find and learn guitar chords for any track or playlist. Start playing your favorite tunes today with our comprehensive library of chords and tabs. Search by song title, artist name, or browse our extensive selection of tunes made for you. Join our community of guitar enthusiasts and take your playing to the next level with our easy-to-use guitar tab and chord search tool.' />
        </Head>
          <Toolbar></Toolbar>
          <div className=' z-0 w-full'>
                <Searchbar></Searchbar>
                <PlaylistSection items={getStartedPlaylists} title={"Get Started"} ></PlaylistSection>
                <PlaylistSection items={playlists} title={"Your playlists"} showAll={"playlists"}></PlaylistSection>
            {/* <p>TASKS: 
                <br /> Create a function to search chatgpt: "out of these genres what are the most chord and guitar heavy: [topGenres]". 
               <br /> Store that into a new usestate variable.
               <br />  Then randomly pick one of those and search spotify for a playlist for that (EG: search spotify for "indie soul" + guitar) and get top playlist.
               <br /> Display that in for you section</p> */}
          </div>
        </>
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
  const playlistsIds = ["4s6bQ5K4OC4abHOnS4yNVT", "0xVhalpT6uPz4z7x8q11X5", "37i9dQZF1EIefLxrHQP8p4", "37i9dQZF1DXd9rSDyQguIk", "37i9dQZF1DZ06evO0QpvRZ", "23SAT4gA6YG4rif1aWGO1q", "4oCpIPPOlpzT8sUEgErt3O", "37i9dQZF1EQp62d3Dl7ECY" ];
    // Check if the data is already cached
  
  
  // // PROTECTED ROUTE
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // } 
  //  const newReleases = await customGet(
  //   "https://api.spotify.com/v1/browse/new-releases?country=IN&limit=25",
  //   session
  // );
  // // FUNCTIONS TO GET DATA
  // // Make the API call if the data is not cached
  // console.log("fetching get started playlists")
  // if(session) {
  //   try {
  //     const responses = await Promise.all(playlistsIds.map(playlistId =>
  //       customGet(
  //         `https://api.spotify.com/v1/playlists/${playlistId}?fields=description%2C+name%2C+id%2C+owner%2C+images`,
  //         session
  //       )
  //     ));
  //     serverGetStartedPlaylists = responses;
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     const response = await customGet(
  //       `https://api.spotify.com/v1/me/playlists?limit=8`,
  //       session
  //     );
  //     userplaylists = response.items
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return {
    props: {
      session,
      serverGetStartedPlaylists,
      userplaylists
    },
    
  };
}



export default Explore