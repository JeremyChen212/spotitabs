import { useSession } from 'next-auth/react';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useRouter } from 'next/router';
import  Button from '@component/components/reusable/Button';
import PlaylistDashboard from '../components/PlaylistDashboard';
import { useEffect, useState } from 'react';
import { IoFilter, IoFilterOutline } from 'react-icons/io5';
import { useSpotify } from '../context/SpotifyContext';
import Navbar from '@component/components/Navbar';
import Heading from '@component/components/reusable/Heading';
import Image from 'next/image';
import Toolbar from '@component/components/Toolbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import PlaylistCard from '@component/components/ExplorePage/PlaylistCard';
import Head from 'next/head';
import Layout from '@component/components/Layout';
import Searchbar from '@component/components/Searchbar';
import SongCard from '@component/components/reusable/SongCard';

function PlaylistsView(sortedPlaylists: any) {
  console.log(sortedPlaylists)
  return (
    <div className="grid flex-col grid-cols-2 pt-2 xl:grid-cols-8 md:grid-cols-4 items-center gap-12 overflow-hidden text-center  w-fit m-auto">
        {sortedPlaylists.sortedPlaylists.map((playlist, index) => (
            <PlaylistCard key={index} playlist={playlist}></PlaylistCard>
        ))}
    </div>
  )
}
function SongsView(songs: any) {
  const songsArray = songs.songs
  console.log(songsArray[0].track)
  return (
    <div className="flex flex-col w-full gap-12 overflow-x-scroll items-between justify-between m-auto">
        {songsArray.map((song, index) => (
          <>
          <SongCard song={song?.track} key={index}></SongCard>
          </>
        ))}
    </div>
  )
}



function Home({session}: any) {
  const router = useRouter()
  // const {status, data: session} = useSession();
  console.log(session)
  const {currentPlaylist} = useSpotify();
  const {overlayTab, setOverlayTab} = useSpotify();
  const [commandDown, setCommandDown] = useState(false)
  const [jDown, setJDown] = useState(false)
  const {status: loading} = useSession();
  const { playlists, fetchRecentlyPlayedSongs, recentlyPlayedSongs, fetchPlaylists } = useSpotify();
  const spotifyApi = useSpotify()
  const { spinner } = useSpotify()
  const skeletonCount = 20
  const [searchBarBoolean, setSearchBarBoolean] = useState("recent")
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent")
  const [libraryView, setLibraryView] = useState("playlists")
  let organizedPlaylists = playlists


  const changeSortBy = () => {
    const newSortOrder = sortBy === 'alphabetical' ? 'recent' : 'alphabetical';
    setSortBy(newSortOrder);
  }
  const changeView = () => {
    const newLibraryView = libraryView === 'songs' ? 'playlists' : 'songs';
    setSortBy(newLibraryView);
  }
  const sortedPlaylists = [...playlists].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });


  useEffect(() => {
      fetchRecentlyPlayedSongs()
    console.log(recentlyPlayedSongs)
    console.log(status)
    fetchPlaylists()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{
  }, [])
  



  if (session) {
    return (
      <Layout>
        <Head>
          <title>Explore | Spotitabs</title>
          <meta name='description' content='Find guitar tabs and chords for your favorite songs and playlists on Spotify. Our search tool allows you to easily find and learn guitar chords for any track or playlist. Start playing your favorite tunes today with our comprehensive library of chords and tabs. Search by song title, artist name, or browse our extensive selection of tunes made for you. Join our community of guitar enthusiasts and take your playing to the next level with our easy-to-use guitar tab and chord search tool.' />
        </Head>
        <Searchbar placeholderText={"Search your playlists"}></Searchbar>
        <div className='text-center my-8 flex flex-col h-fit mx-auto m-auto w-fit'>
          {/* <h1 className="text-center text-[4rem] mb-10">YOUR PLAYLISTS</h1> */}
          <div className="flex text-xl  justify-between mb-8">
            <div className='text-sm relative'>
                <span onClick={changeSortBy} className='flex gap-2 cursor-pointer pr-5 select-none items-center'>
                  <FontAwesomeIcon className="h-fit" icon={faSort}/>  
                  {sortBy === "alphabetical" ? (
                    <p  className='text-sm'>
                    Alphabetical
                    </p>                ) : (
                    <p className='text-sm'>
                    Recents
                    </p>                
                  )}
                </span>
            </div>
          {/* <FontAwesomeIcon icon={faSearch}/>  */}
          <Button size={"sm"} selected={true}>Playlists</Button>
          <Searchbar myClass={`w-0 hidden ${searchBarBoolean && "flex"}`}></Searchbar> 
          </div>
          <PlaylistsView sortedPlaylists={sortedPlaylists}></PlaylistsView>
          <SongsView songs={recentlyPlayedSongs}></SongsView>
        </div>
      </Layout>
    );
  } 
  return (
    <div className="flex column">
      Not Logged In
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