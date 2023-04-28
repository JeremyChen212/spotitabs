import { useSpotify } from "@component/context/SpotifyContext"
import { useEffect, useState, useRef } from "react"
import Icon from "../reusable/Icon"

export default function SearchOverlay() {
    const searchInput = useRef(null)
    const {popupActive, setPopupActive} = useSpotify()
    const [searchQuery, setSearchQuery] = useState("")
    useEffect(()=>{
        let searchInput = document.getElementById("searchInput")
        //  Autofocus search input
        if(!popupActive) {
            searchInput.blur();
        } else {
        // Clear input
            setSearchQuery('')
            searchInput.focus()
        }
    }, [popupActive])
    return (
        <div>
            <div className="w-full px-5">
                    <input id="searchInput" type="text" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} className="outline-none bg-[#ffffff00] w-full p-5" placeholder="Type a song"/>
                    <hr className="opacity-20 z-3"/>
                </div>
        </div>
    )
}