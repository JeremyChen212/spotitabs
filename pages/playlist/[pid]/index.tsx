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
import SongCard from "@component/components/reusable/SongCard";
import Head from "next/head.js";
import PlaylistSidebar from '@component/components/MainPage/PlaylistSidebar';
import { IoArrowForward } from 'react-icons/io5';
import MiddleSection from "@component/components/MainPage/MiddleSection";
export default function PlaylistPlayer({playlist, serverPlaylist}: any) {
    const router = useRouter()
    const { pid } = router.query
    const {overlayTab, setOverlayTab} = useSpotify();
    const {popupActive, setPopupActive, currentSong, setCurrentSong} = useSpotify();
    console.log(serverPlaylist)
    useEffect(() => {

    })
    useEffect(() => {
      document.body.style.overflowY = "hidden"
      setOverlayTab("")
      setPopupActive(false)
      console.log(serverPlaylist.tracks.items[0].track.album.images[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <>
        <div className={`absolute flex left-6 right-6 bottom-6 top-[6rem] gap-2 text-white`}>
          <PlaylistSidebar playlist={serverPlaylist}></PlaylistSidebar>
          <div className="h-full border-[1px] border-[var(--bg2)]"></div>
          <MiddleSection song={currentSong}></MiddleSection>
        </div>
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
  