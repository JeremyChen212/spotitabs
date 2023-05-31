import { Track } from "@component/types/types";
import { IoBookmarkOutline, IoEllipsisHorizontalSharp } from "react-icons/io5";
import Image from "next/image";
import { useWindowSize } from "@component/lib/window";
import SongHeader from "./SongHeader";
import Lyrics from './Lyrics'

export default function MiddleSection({song: Track}) {
    const windowSize = useWindowSize()

    return (
        <div className="w-full ml-4">
            <SongHeader></SongHeader>
            <Lyrics></Lyrics>
        </div>
    )
}


