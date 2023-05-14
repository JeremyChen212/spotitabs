import Link from "next/link";
import { useRouter } from "next/router";
import { useSpotify } from "../../context/SpotifyContext";
import { useSession } from "next-auth/react";
import PlaylistCard from "../reusable/PlaylistCard";
import Heading from '../reusable/Heading';
import SkeletonCard from '../reusable/SkeletonCard';
import { Application } from '@splinetool/runtime';
import { useEffect } from "react";
import BigCard from '../reusable/BigCard'

export default function PlaylistSection({items, title, showAll, bigCard}: any) {
    const router = useRouter();
    const { status, data: session } = useSession()
    const spotifyApi = useSpotify()
    const { spinner } = useSpotify()
    const skeletonCount = 20
    const {status: loading} = useSession();
    let skeletonCards = Array(8).fill(0);
    
   
    console.log(showAll)
    if(items.length > 0) {
        return (
            <div className="w-full h-fit relative pb-10">
            <div className="flex items-center justify-between">
                <Heading text={title}></Heading>
                {showAll !== undefined && (
                    <Link className="opacity-70 font-medium hover:underline" href={showAll}>Show all</Link>
                )}
            </div>
            {/* <div className="grid justify-start grid-rows-[auto auto] grid-flow-col grid-rows-2 2xl:grid-cols-4 -ml-11 -mr-11 w-100vw  px-11 py-2 pb-4 overflow-x-scroll gap-6"> */}
            <div className="grid justify-start grid-cols-2 overflow-hidden md:grid-cols-4 lg:grid-cols-6 -ml-11 -mr-11 w-100vw px-11 py-2 pb-4 gap-6">
                {items.slice(0, 6).map((playlist: any, index: any)=>(
                    <>
                    {index <= 3 ? (
                        <BigCard key={playlist.id} playlist={playlist}></BigCard>
                    ) : (
                        <BigCard hidden={true} key={playlist.id} playlist={playlist}></BigCard>
                    )
                    } 
                    </>
                ))}
            </div>
            <div id="canvas3d">
            </div>
        </div>
        )
    } else {
        return (
        <div className="w-full h-fit relative pb-10">
            <div className="flex items-center justify-between">
                <Heading text={title}></Heading>
                {showAll !== undefined && (
                    <Link className="opacity-70 font-medium hover:underline" href={showAll}>Show all</Link>
                )}
            </div>
            <div className="grid justify-start grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 -ml-11 -mr-11 w-100vw px-11 py-2 pb-4 gap-6">
                {skeletonCards.map((card: any, index: any)=>(
                    <SkeletonCard key={index}></SkeletonCard>
                ))}
            </div>
            <div id="canvas3d">

                </div>
        </div>
        )
    }
   
}

