import {IoCloseCircleSharp} from "react-icons/io5"
import { FaWindowMinimize } from "react-icons/fa";
import styles from "../styles/Transition.module.css"
import { useEffect, useState, useRef } from "react"
import { useSpotify } from "@component/context/SpotifyContext"
import YourPlaylists from "./YourPlaylists"
import SavedOverlay from "./SavedOverlay.tsx"
import SearchOverlay from "./SearchOverlay"
import Icon from '../reusable/Icon'
export default function PopupZoom({active}) {
    const searchInput = useRef(null)
    const [searchQuery, setSearchQuery] = useState("")
    const {popupActive, setPopupActive}= useSpotify()
    const {overlayTab, setOverlayTab} = useSpotify();
    var fired = false;
    const handleKeyDown = (event) => {
        if(event.metaKey && event.key == "k") {
            setPopupActive(!popupActive)
            setSearchQuery("")
            // if(popupActive === true) {
            //     setOverlayTab("search")
            // }
            console.log(active)
        }
    }
    useEffect(()=>{
        console.log(overlayTab)
        // If clicked outside div...close popup
        document.addEventListener("mousedown", function(e) {
            if (!document.getElementById('zoomContainer').contains(e.target)){
                setPopupActive(false)
            } 
        })
        let searchInput = document.getElementById("searchInput")
        // If popup not open...OPEN popup
        if(!popupActive) {
            searchInput.blur();
            document.addEventListener("keydown", handleKeyDown)
            return () => document.removeEventListener("keydown", handleKeyDown)
        } else {
        // If popup open...CLOSE popup
            setSearchQuery('')
            searchInput.focus()
            document.addEventListener("keydown", handleKeyDown)
            return () => document.removeEventListener("keydown", handleKeyDown)
        }
    }, [popupActive])
    function checkActiveTab(tab) {
        if (tab === overlayTab) {
            return true
        }else {
            return false
        }
    }
    function showTab(tab) {
        console.log("SHOWING TAB")
        setOverlayTab(tab)
        setPopupActive(true)
        console.log(overlayTab)
    }
    return (
        <div id="overlayParent" className="fixed left-0 top-0 h-full w-full m-auto text-center pointer-events-none z-30">
            <div id="zoomContainer" className={`scale-50 z-30 opacity-0 fixed left-[50%] rounded-md overflow-hidden translate-x-[-50%] lg:max-w-[50%] sm:w-[70%] sm:h-[80%] w-[100%] h-[100%] top-[50%] translate-y-[-50%] text-white bg-[#8c8a8a52] pointer-events-none backdrop-blur-[50px] origin-center  ${!popupActive ? "zoomContainerClose" : "zoomContainerOpen"} `}>
                <p className="hidden">e</p>
                <div className="fixed top-2 z-8 w-full">
                    <div className="flex px-8 left-8 top-4 gap-3 w-fit h-[1.5rem]">
                            <Icon popupActive={popupActive}  onClickFunc={() => setPopupActive(false)}  icon={"/images/MinimizeIcon.svg"} myClass={"mr-6"}></Icon>
                            {/* <Icon active={false}
                        icon={"/images/HomeIcon.svg"}></Icon> */}
                            {/* <Icon popupActive={popupActive} active={checkActiveTab("search")} onClickFunc={() => showTab("search")}  icon={"/images/SearchIcon.svg"}></Icon>
                            <Icon popupActive={popupActive} active={checkActiveTab("playlists")} onClickFunc={() => showTab("playlists")} icon={"/images/PlaylistsIcon.svg"}></Icon>
                            <Icon popupActive={popupActive} active={checkActiveTab("saved")} onClickFunc={() => showTab("saved")} icon={"/images/SaveIcon.svg"}></Icon> */}
                    </div>
                    <input id="searchInput" type="text" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} className="outline-none bg-[#ffffff00] w-full p-8" placeholder="Type a song"/>
                    <hr className="opacity-20 z-3"/>
                </div>
                <div className="mt-[8.04rem] z-1 overflow-hidden h-full">
                {overlayTab === "playlists" && <YourPlaylists></YourPlaylists>}
                {overlayTab === "saved" && <SavedOverlay></SavedOverlay> }
                {overlayTab === "search" && <SearchOverlay></SearchOverlay>}
                </div>
            </div>
        </div>
    )
}