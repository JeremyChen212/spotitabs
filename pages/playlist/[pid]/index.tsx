import { useRouter } from "next/router"
import { customGet } from "@component/utils/customGet";
import { getSession } from 'next-auth/react';
import Navbar from "@component/components/Navbar";
import OverlayTab from "@component/components/OverlayTab";
import YourPlaylists from "@component/components/overlays/YourPlaylists";
import SavedOverlay from '../../../components/overlays/SavedOverlay.tsx';
import { useSpotify } from '../../../context/SpotifyContext'
import { useEffect } from "react";
import MainOverlay from "../../../components/overlays/MainOverlay"

export default function PlaylistPlayer({playlist}) {
    const router = useRouter()
    const { pid } = router.query
    const {overlayTab, setOverlayTab} = useSpotify();
    console.log(playlist.tracks.items[0])
    useEffect(() => {
      setOverlayTab("")
    }, [pid])
    return (
      <div className={`max-w-[1800px] m-auto  mx-8 items-start h-fit flex flex-col text-white`}>
        <Navbar></Navbar>
        <div className="flex w-full gap-5">
          <div className="bg-bg2 rounded-md overflow-hidden max-w-md w-[50rem]">
              <h1 className="py-6 text-white text-xl w-full text-center inline-block">
                  {playlist.name}
              </h1>
              <div className="flex flex-col p-6 gap-3">
                {playlist.tracks.items.map((track, i) => (
                  <div key={i} className="flex gap-2 w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                    <img src={track.track.album.images?.[0]?.url} className="w-14 rounded-sm"/>
                    <div className="flex flex-col">
                      <h2 >
                        {track.track.name}
                      </h2>
                      <p>
                        {track.track.artists.map((artist, i) => (
                            <>
                            {artist.name}
                            {(i === 0) && (track.track.artists.length > 1) ? ', ' : ' '}
                            </>
                        ))}
                      </p>
                    </div>
                    </div>
                ))}
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
        <MainOverlay></MainOverlay>
      </div>
    )
}


export async function getServerSideProps(context: GetSessionParams | undefined) {
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
    const playlist = await customGet(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      session
    );
    return {
      props: {
        session,
        playlist
      },
    };
  }
  