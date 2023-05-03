import Link from "next/link"
import styles from '../styles/Custom.module.scss'
import { useSpotify } from "@component/context/SpotifyContext"
import Image from "next/image";
export default function Card({playlist}: any) {
    const {overlayTab, setOverlayTab} = useSpotify();
    function handleClick(){
        // close overlay when a playlist is selected
        console.log("age")
    }
    return (
        <Link className="relative rounded-md bg-[#010504] cursor-pointer w-[10rem] h-full hover:scale-90 transition-all" onClick={()=> handleClick()} href={`/playlist/${playlist.id}`} >
        <div className={'relative rounded-md flex-column w-[10rem] overflow-hidden p-5'} id={playlist.id}  >
            <Image alt={playlist?.images?.[0]?.url} width="100" height="100"
            src={playlist?.images?.[0]?.url} className="w-full h-auto"
            />
            <h1 className="font-medium w-full whitespace-nowrap overflow-hidden text-ellipsis text-semibold text-lg text-[#e3fff9] pt-5" >{playlist.name}</h1>
        </div>
        </Link>
    )
}