import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSpotify } from "../context/SpotifyContext";
import { useSession } from "next-auth/react";
import { SkeletonCard } from "./SkeletonCard";
import Image from "next/image";
import PlaylistCard from "./ExplorePage/PlaylistCard";
type ImageProps = {
    src: string | null;
}
  
function PlaylistDashboard() {
    const router = useRouter();
    const { data: session } = useSession();
    const { playlists, fetchPlaylists } = useSpotify();
    // const [playlists, setPlaylists] = useState();
    const spotifyApi = useSpotify()
    const { spinner } = useSpotify()
    const skeletonCount = 20

    function toggleSort(sortBy) {
        switch(sortBy) {
            case 0:
            const day = "Sunday";
        }
    }
    let organizedPlaylists = playlists
    .sort((a, b) => a.name.localeCompare(b.name))
    useEffect(() => {
        console.log(spinner)
        console.log(status)
        fetchPlaylists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            className="grid flex-col grid-cols-2 xl:grid-cols-8 md:grid-cols-4 items-center gap-12 overflow-x-scroll text-center  w-fit m-auto">
                {organizedPlaylists.map((playlist, index) => (
                    //         <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                    // <Link key={playlists.name} href={`/playlist/${playlist.id}`} >
                    // <div className={'h-[100%] relative cursor-pointer hover:scale-90 transition-all'} id={playlist.id}  >
                    //     <img className={"w-[100%] h-[100%] object-cover"} src={playlist?.images?.[0]?.url} />
                    //     <h1 className="absolute w-[100%] text-center bg-[#000000cd] text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-3" >{playlist.name}</h1>
                    // </div>
                    // </Link>
                    // <div key={playlist.id} className="gap-4 items-start grid grid-cols-8" >
                    //     {!playlist?.images?.[0]?.url ? (
                    //         <div>
                    //         </div>
                    //     ) : (
                    //         <Image 
                    //         unoptimized={true}
                    //         src={playlist?.images?.[0]?.url} 
                    //         width={112} height={112}  
                    //         alt="Song Image" 
                    //         className="h-auto col-span-1 w-full object-cover" priority/> 
                    //     )}

                    //         <h1 className="text-lg justify-self-start col-span-4">{playlist.name}</h1>
                    // </div>
                    <PlaylistCard key={index} playlist={playlist}></PlaylistCard>
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