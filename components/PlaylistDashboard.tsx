import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSpotify } from "../context/SpotifyContext";
import styles from '../styles/Custom.module.css'
import { getSession, useSession } from "next-auth/react";
import { getUsersPlaylists } from '../lib/spotify'
import Card from "./Card";
import { SkeletonCard } from "./SkeletonCard";

function PlaylistDashboard() {
    const router = useRouter();
    const { data: session } = useSession();
    const { playlists, fetchPlaylists } = useSpotify();
    // const [playlists, setPlaylists] = useState();
    const spotifyApi = useSpotify()
    const { spinner } = useSpotify()
    const skeletonCount = 20
    useEffect(() => {
        console.log(spinner)
        console.log(status)
        fetchPlaylists()
      if(playlists) {
      }
    }, []);

    if (spinner) {
        return (
            <div className={`grid w-full md:px-0  transition-all gap-[1.5rem] max-w-[50rem] sm:grid-cols-4 grid-cols-1 `}>
                {Array(skeletonCount).fill(<SkeletonCard />)}
            </div>
        )
      }
    if(playlists !== undefined) {
        return (
            <>
            <div 
            // className={`grid transition-all grid-cols-1 gap-[1.5rem] xl:grid-cols-4 max-w-[50rem] lg:grid-cols-3 md:grid-cols-2 xl`}
            className="flex flex-col px-5 h-[13rem] items-start gap-4 overflow-x-scroll w-fit m-auto">
                {playlists.map((playlist, index) => (
                    //         <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                    // <Link key={playlists.name} href={`/playlist/${playlist.id}`} >
                    // <div className={'h-[100%] relative cursor-pointer hover:scale-90 transition-all'} id={playlist.id}  >
                    //     <img className={"w-[100%] h-[100%] object-cover"} src={playlist?.images?.[0]?.url} />
                    //     <h1 className="absolute w-[100%] text-center bg-[#000000cd] text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-3" >{playlist.name}</h1>
                    // </div>
                    // </Link>
                    <div key={playlist.id} >
                        <h1>{playlist.name}</h1>
                        {/* <Card playlist={playlist} /> */}
                    </div>
                ))}
            </div>
            </> 
        )
    } else return (
        <div>
            loading...
        </div>
    )
}


export default PlaylistDashboard