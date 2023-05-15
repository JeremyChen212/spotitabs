import { IoSearch } from 'react-icons/io5';
import { useState, useRef } from "react";
import { useSpotify } from "@component/context/SpotifyContext";


export default function Searchbar() {
    const searchInput = useRef(null)
    const {popupActive, setPopupActive} = useSpotify()
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <div className="w-full bg-[#FFFFFF] my-4 rounded-md relative">
                <IoSearch className="text-[#17191A] left-0 ml-4 stroke-[1rem] text-xl absolute pointer-events-none top-[50%] translate-y-[-50%]"></IoSearch>
                <input id="searchInput" type="text" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} 
                className="outline-none bg-[#ffffff00] text-[#17191A] w-full p-3 pl-12" placeholder="Find a song, artist, album, or playlist"/>
                {/* <hr className="opacity-20 z-3"/> */}
        </div>
    )
}