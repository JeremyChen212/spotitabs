import Heading from "../reusable/Heading";
import PlaylistDashboard from "../PlaylistDashboard";
import { useSpotify } from "../../context/SpotifyContext";
import { useRouter } from "next/router";
export default function YourPlaylists() {
    const {overlayTab, setOverlayTab} = useSpotify();
    const router = useRouter();
    console.log(router.pathname)
    console.log(overlayTab)
    return(
        // <div className={`${overlayTab === "playlist" && "scale-100"} absolute z-30 transition-all scale-0 w-full origin-top  right-0 h-full bg-bg2 `}>
            // <IoClose onClick={()=> {setOverlayTab("")}} className={`${router.pathname === "/home" && "hidden"} cursor-pointer text-3xl absolute top-16 left-16`}></IoClose>
            <div className=" h-fit items-center flex flex-col gap-5 text-white">
                    <Heading className={"text-center w-full"} text={"My Playlists"} />
                    <PlaylistDashboard ></PlaylistDashboard>
            </div>
        // </div>
    )
}