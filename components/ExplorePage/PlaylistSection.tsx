import Link from "next/link";
import { useRouter } from "next/router";
import { useSpotify } from "../../context/SpotifyContext";
import { useSession } from "next-auth/react";
import PlaylistCard from "./PlaylistCard";
import Heading from '../reusable/Heading';
import SkeletonCard from './SkeletonCard';
import { Application } from '@splinetool/runtime';
import { useEffect } from "react";
import BigCard from './BigCard'

export default function PlaylistSection({items, title, showAll, bigCard}: any) {
    const router = useRouter();
    const { status, data: session } = useSession()
    const spotifyApi = useSpotify()
    const { spinner } = useSpotify()
    const skeletonCount = 20
    const {status: loading} = useSession();
    let skeletonCards = Array(8).fill(0);
    
   
    console.log(showAll)
    // if (spinner) {
    //     return (
    //         <div className="w-full">
    //             <Heading text={"Get Started"}></Heading>
    //             <div className={`grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6`}>
    //                 {Array(skeletonCount).fill(<SkeletonCard />)}
    //             </div>
    //         </div>
    //     )
    //   }
    if(items.length > 0) {
        return (
            <div className="w-full h-fit relative pb-10">
                <div className="flex items-center justify-between">
                    <Heading text={title} size={"lg"}></Heading>
                    {showAll !== undefined && (
                        <Link className="opacity-70 font-medium hover:underline" href={showAll}>Show all</Link>
                    )}
                </div>
                {/* <div className="grid justify-start grid-rows-[auto auto] grid-flow-col grid-rows-2 2xl:grid-cols-4 -ml-11 -mr-11 w-100vw  px-11 py-2 pb-4 overflow-x-scroll gap-6"> */}
                <div className="grid justify-start sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 lg:grid-cols-6 -ml-11 -mr-11 w-100vw px-11 py-2 pb-4 gap-8">
                    {items.slice(0, 8).map((playlist: any, index: any)=>(
                        <>
                         {index <= 1 ? (
                            <PlaylistCard hidden={true} key={playlist.id} playlist={playlist}></PlaylistCard>
                            ) : (
                                <PlaylistCard hidden={false} key={playlist.id} playlist={playlist}></PlaylistCard>
                            )
                            } 
                        </>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
        <div className="w-full h-fit relative pb-10">
            <div className="flex items-center justify-between">
                <Heading text={title} size={"lg"}></Heading>
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

