import { useRouter } from "next/router"
import { customGet } from "@component/utils/customGet";
import { getSession } from 'next-auth/react';
import Navbar from "@component/components/Navbar";
import OverlayTab from "@component/components/OverlayTab";
import YourPlaylists from "@component/components/overlays/YourPlaylists";
import SavedOverlay from '../../../components/overlays/SavedOverlay.tsx';
import { useSpotify } from '../../../context/SpotifyContext'
import { useEffect } from "react";
// import MainOverlay from "../../../components/overlays/MainOverlay"
import Image from "next/image.js";

export default function PlaylistPlayer({playlist, serverPlaylist}: any) {
    const router = useRouter()
    const { pid } = router.query
    const {overlayTab, setOverlayTab} = useSpotify();
    const {popupActive, setPopupActive} = useSpotify();
    console.log(playlist)
    useEffect(() => {
      setOverlayTab("")
      setPopupActive(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
      <>
        {/* <MainOverlay></MainOverlay> */}
        <div className="flex w-full gap-5">
          <div className="bg-bg2 rounded-md overflow-hidden max-w-md w-[50rem]">
              <h1 className="py-6 text-white text-xl w-full text-center inline-block">
                  {playlist.name}
              </h1>
              <div className="flex flex-col p-6 gap-3">
                {serverPlaylist.tracks.items.map(({track, i}: any) => (
                  <div key={i} className="flex gap-2 w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                    <Image alt={track.track.album.images?.[0]?.url} src={track.track.album.images?.[0]?.url} width={100} height={100} className="w-14 h-auto rounded-sm"/>
                    <div className="flex flex-col">
                      <h2 >
                        {track.track.name}
                      </h2>
                        {track.track.artists.map(({artist, i}: any) => (
                            <p key={artist}>
                              {artist.name}
                              {(i === 0) && (track.track.artists.length > 1) ? ', ' : ' '}
                            </p>
                        ))}
                    </div>
                    </div>
                ))}
                ese
              </div>
          </div>
          <div className="bg-bg2 rounded-md overflow-hidden w-full">
              <h1 className="bg-bg3 py-6 text-bg2 text-xl w-full text-center inline-block mb-5">
                  Song name
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
    console.log(context.params.pid)
    const playlistId = context.params.pid;
    let serverPlaylist;
    try {
      const response = await customGet(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        session
      );
      serverPlaylist = response.items
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
  