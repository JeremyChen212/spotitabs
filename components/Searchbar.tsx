import { IoSearch } from 'react-icons/io5';
import { useState, useRef } from "react";
import { useSpotify } from "@component/context/SpotifyContext";


export default function Searchbar() {
    const searchInput = useRef(null)
    const {popupActive, setPopupActive} = useSpotify()
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <div className="w-full my-2 animated-border-3 rounded-md relative">
                <IoSearch className="text-[white] right-0 mr-4 text-xl absolute pointer-events-none top-[50%] translate-y-[-50%]"></IoSearch>
                <input id="searchInput" type="text" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} 
                className="outline-none bg-[#ffffff00] text-[white] w-full p-3 pl-4" placeholder="Type a song"/>
                {/* <hr className="opacity-20 z-3"/> */}
        </div>
    )
}