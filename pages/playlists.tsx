import { useSession } from 'next-auth/react';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
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

function Home({session}: any) {
  const router = useRouter()
  // const {status, data: session} = useSession();
  console.log(session)
  const {currentPlaylist} = useSpotify();
  const {overlayTab, setOverlayTab} = useSpotify();
  const [commandDown, setCommandDown] = useState(false)
  const [jDown, setJDown] = useState(false)
  const {status: loading} = useSession();
    
  const { playlists, fetchPlaylists } = useSpotify();
  // const [playlists, setPlaylists] = useState();
  const spotifyApi = useSpotify()
  const { spinner } = useSpotify()
  const skeletonCount = 20
  const [searchBarBoolean, setSearchBarBoolean] = useState("recent")
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent")
  let organizedPlaylists = playlists

  // const handleDropdownClick = () => {
  //   const dropdown = document.getElementById("sort-by-dropdown");
  //   if(sortBy === "az") {
  //     console.log("AZAZAZ")
  //     setSortBy("recent")
  //     organizedPlaylists = playlists.sort((a, b) => a.name.localeCompare(b.name))
  //   } else {
  //     setSortBy("az")
  //     organizedPlaylists = playlists
  //   }
  // }
  const changeSortBy = () => {
    const newSortOrder = sortBy === 'alphabetical' ? 'recent' : 'alphabetical';
    setSortBy(newSortOrder);
  }
  const sortedPlaylists = [...playlists].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });


  useEffect(() => {
      console.log(spinner)
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
              {/* <div  id='sort-by-dropdown' className='bg-[var(--bg-3-color)] top-8 z-50 px-4 py-4 absolute left-0 origin-top-left scale-0 rounded-lg'>
                {sortBy === "az" ? (
                  <div>Alphabetically</div>
                ) : (
                  <div>Alphabetically</div>
                )}
              </div> */}
            </div>
          {/* <FontAwesomeIcon icon={faSearch}/>  */}
          <Searchbar myClass={`w-0 hidden ${searchBarBoolean && "flex"}`}></Searchbar> 
          </div>
          <>
            <div 
            // className={`grid transition-all grid-cols-1 gap-[1.5rem] xl:grid-cols-4 max-w-[50rem] lg:grid-cols-3 md:grid-cols-2 xl`}
            className="grid flex-col grid-cols-2 xl:grid-cols-8 md:grid-cols-4 items-center gap-12 overflow-x-scroll text-center  w-fit m-auto">
                {sortedPlaylists.map((playlist, index) => (
                    <PlaylistCard key={index} playlist={playlist}></PlaylistCard>
                ))}
            </div>
            </> 
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