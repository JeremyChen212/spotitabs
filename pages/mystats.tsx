import { useSession } from 'next-auth/react';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useRouter } from 'next/router';
import { IoChevronBack } from 'react-icons/io5';
import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import Image from 'next/image';
import axios from 'axios';

function Home({session, serverTopArtists}: any) {
  const router = useRouter()
  const {currentPlaylist} = useSpotify();
  const {topArtists, fetchTopArtists, topGenres, getTopGenres} = useSpotify();

  const {status: loading} = useSession();
  useEffect(() => {
    if (topArtists.length === 0) {
        fetchTopArtists()
        console.log(topArtists.length)
    }
    
   
}, [fetchTopArtists, topArtists]);
useEffect (() => {
  if(topGenres.length === 0) {
    getTopGenres()
    console.log(topGenres)
    }
  }, [topGenres, getTopGenres])

  

  if (session) {
    return (
      <>
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
                        {topArtists.map((artist: any, index) => (
                            <h1 key={artist}>{artist.name}</h1>
                        ))}
                    </div>
                    <div>
                        <h1 className="text-[1.5rem] underline mb-4">Top Genres ({topGenres.length})</h1>
                        {topGenres.map((genre, index) => (
                            <h1 key={genre}>{genre}</h1>
                        ))}
                    </div>
                </div>
          </div>
        </>
    );
  } 
  return (
    <div className="flex column">
      Not Logged In. Please go to /login.
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  let serverTopArtists : any[] = []
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } 


  if(session) {
    try {
      const resp = await axios.get("/api/topartists")
      const data = resp.data
      console.log(serverTopArtists)
      serverTopArtists = data.topArtists
    } catch (err) { 
      console.log(err)
    }
  }

  
  
  return {
    props: {
      session,
      serverTopArtists
    },
  };
}


export default Home