import { useSession } from 'next-auth/react';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import Navbar from '@component/components/Navbar';
import Image from 'next/image';
// import MainOverlay from '@component/components/overlays/MainOverlay'
function Home({session}: any) {
  const router = useRouter()
  // const {status, data: session} = useSession();
  console.log(session)
  const { accessToken } = session
  const {currentPlaylist} = useSpotify();
  const {overlayTab, setOverlayTab} = useSpotify();
  useEffect(() => {
    // setOverlayTab("playlists")
  })
  // if(status === "loading") {
  //   console.log("loading")
  //   return <Loader />
  // }
  const {status: loading} = useSession();

  
  
  // useEffect(() => {
  //   console.log(session)
  //   // Redirect to login page if session is expired or missing tokens
  //   if (!loading && (!session || !session.accessToken || !session.refreshToken)) {
  //     router.push('/login');
  //   }
  // }, [session, loading, router]);
    
  // // Redirect to home page after logging in
  // useEffect(() => {
  //   if (!loading && session && session.accessToken && session.refreshToken) {
  //     router.push('/');
  //   }
  // }, [session, loading, router]);


  if (session) {
    return (
      <div className={`max-w-[1800px] m-auto  mx-6 items-start h-fit flex flex-col text-white`}>
          {/* <div
            className='z-0 brightness-50' 
            style={{
              position: 'fixed',
              height: '100%',
              width: '100%',
              left: '0',
              top: '0',
            }}
          >
            <Image
              src={leafyshoe}
              layout="fill"
              objectFit="cover"
              sizes="100vw"
            />
          </div> */}
        {/* <MainOverlay></MainOverlay> */}

        <Navbar></Navbar>

        {/* <Heading className={"z-10"} text={"My Playlists"} /> */}
        {/* <PlaylistDashboard ></PlaylistDashboard> */}
        {/* <YourPlaylists></YourPlaylists> */}
      </div>
    );
  } 
  return (
    <div className="flex column">
    <Image
      src='/public/Spotitabs_Logo.jpg'
      alt="spotify logo"
    />
    {/* <Button
      size='lg' width="100%"
      onClick={handleLogin}
    >
      Login
    </Button> */}
  </div>
  )
}

export async function getServerSideProps(context: any) {
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