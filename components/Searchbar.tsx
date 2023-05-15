import { IoSearch, IoArrowForward, IoCaretForward } from 'react-icons/io5';
import { useState, useRef } from "react";
import { useSpotify } from "@component/context/SpotifyContext";
import { useRouter } from 'next/router';


export default function Searchbar({myClass}: any) {
    const router = useRouter();
    const searchInput = useRef(null)
    const {popupActive, setPopupActive} = useSpotify()
    const [searchQuery, setSearchQuery] = useState("")
    function handleSearch(event) {
        event.preventDefault();
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    return (
        <form onSubmit={(e)=>handleSearch(e)} className={`${myClass} w-full bg-[var(--bg-2-color)] text-[white] my-4 rounded-md relative`}>
                <IoSearch className="text-[#ffffff6a] left-0 ml-4 stroke-[1rem] text-xl absolute pointer-events-none top-[50%] translate-y-[-50%] "></IoSearch>
                <input id="searchInput" type="text" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} 
                className="peer outline-none bg-[#ffffff00] w-full p-3 pl-12" placeholder="Find a song, artist, album, or playlist"/>
                <button type="submit" className="text-[#17191A] absolute top-[50%] translate-y-[-50%] right-0 opacity-0 mr-2 h-8 w-8 flex items-center justify-center rounded-md bg-[#A4FDD3] peer-focus:opacity-100 transition-all overfow-hidden group">
                    <IoCaretForward className="transition-[inherit] group-hover:translate-x-[0.3rem]"></IoCaretForward>
                    <IoCaretForward className='transition-[inherit] absolute left-[-1rem] opacity-0 group-hover:left-[0.3rem] group-hover:opacity-100'></IoCaretForward>
                </button>
                {/* <hr className="opacity-20 z-3"/> */}
        </form>
    )
}