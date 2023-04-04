import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSpotify } from "../context/SpotifyContext";
import styles from '../styles/Custom.module.css'
import { getSession, useSession } from "next-auth/react";
import { getUsersPlaylists } from '../lib/spotify'

function PlaylistDashboard() {
    const router = useRouter();
    const { status, data: session } = useSession()
    const { playlists, fetchPlaylists } = useSpotify();
    const { playlistComponent, setPlaylistComponent } = useState();
    // const [playlists, setPlaylists] = useState();
    const spotifyApi = useSpotify()
    useEffect(() => {
        console.log(status)
        if(session) {
            console.log(session.accessToken)
        }
        fetchPlaylists()
      if(playlists) {
      }
    }, []);

    if (router.isFallback) {
        return <div>Loading...</div>
      }
    if(playlists !== undefined) {
    return (
        <div className={`grid transition-all grid-cols-1 gap-[1.5rem] max-w-[50rem] sm:grid-cols-3 ${styles.slideInLeft}`}>
            {playlists.map((playlist, index) => (
                //         <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                <Link key={playlists.name} href={`/playlist/${playlist.id}`} >
                <div className={'h-[100%] relative cursor-pointer hover:scale-90 transition-all'} id={playlist.id}  >
                    <img className={"w-[100%] h-[100%] object-cover"} src={playlist?.images?.[0]?.url} />
                    <h1 className="absolute w-[100%] text-center bg-[#000000cd] text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-3" >{playlist.name}</h1>
                </div>
                </Link>
            ))}
        </div>
      )
    } else {
        <div>
            loading...
        </div>
    }
}
    

export default PlaylistDashboard