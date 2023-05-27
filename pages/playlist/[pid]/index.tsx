import { useRouter } from "next/router"
import { customGet } from "@component/utils/customGet";
import { getSession } from 'next-auth/react';
import Navbar from "@component/components/Navbar";
import YourPlaylists from "@component/components/overlays/YourPlaylists";
import SavedOverlay from '../../../components/overlays/SavedOverlay.tsx';
import { useSpotify } from '../../../context/SpotifyContext'
import { useEffect } from "react";
// import MainOverlay from "../../../components/overlays/MainOverlay"
import Image from "next/image.js";
import SongCard from "@component/components/reusable/SongCard.tsx";
import Head from "next/head.js";

export default function PlaylistPlayer({playlist, serverPlaylist}: any) {
    const router = useRouter()
    const { pid } = router.query
    const {overlayTab, setOverlayTab} = useSpotify();
    const {popupActive, setPopupActive, currentSong, setCurrentSong} = useSpotify();
    console.log(playlist)
    useEffect(() => {

    })
    useEffect(() => {
      setOverlayTab("")
      setPopupActive(false)
      console.log(serverPlaylist.tracks.items[0].track.album.images[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <>
        {/* <MainOverlay></MainOverlay> */}
        <div className="flex w-full mb-6 flex-[1 1 auto] h-full gap-5 text-white ">
          <div className="bg-[var(--bg2)] p-4 rounded-md overflow-hidden max-w-md w-[50rem]">
              <h1 className="py-6 text-xl line-clamp-1 text-ellipse  w-full text-center inline-block">
                  {serverPlaylist.name}
              </h1>
                {serverPlaylist.tracks.items.map((item, index) => (
                  <SongCard song={item.track} key={index} />
                ))}
          </div>
          <div className="h-full border-[1px] border-[var(--bg2)]"></div>
          <div className="rounded-md overflow-hidden w-full">
              <h1 className="bg-bg3 py-6 text-bg2 text-xl w-full text-center inline-block mb-5">
                  
              </h1>
          </div>
        </div>
        {/* <YourPlaylists></YourPlaylists> */}
        {/* <SavedOverlay></SavedOverlay> */}
        </>
    )
}


export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    const playlistId = context.params.pid;
    let serverPlaylist;
    try {
      const response = await customGet(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        session
      );
      serverPlaylist = response
      console.log(serverPlaylist)
    } catch (error) {
      console.log(error);
    }
    return {
      props: {
        session,
        serverPlaylist
      },
    };
  }
  