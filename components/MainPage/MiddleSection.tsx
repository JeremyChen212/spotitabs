import { Track } from "@component/types/types";
import { IoBookmarkOutline, IoEllipsisHorizontalSharp } from "react-icons/io5";
import Image from "next/image";
import { useWindowSize } from "@component/lib/window";
import SongHeader from "./SongHeader";
import Lyrics from './Lyrics'
import { useRouter } from "next/router";

export default function MiddleSection({currentSong}) {
    const windowSize = useWindowSize()
    const router = useRouter();
    console.log(router.query.song_id)
    return (
        <div className="w-full ml-4">
            {router.query.song_id ? 
                <SongHeader currentSong={currentSong}></SongHeader>
            :
                <>
                Please pick a song
                </>
            }
            <Lyrics></Lyrics>
        </div>
    )
}


