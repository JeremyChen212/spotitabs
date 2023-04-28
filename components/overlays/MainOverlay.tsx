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
    
    const {popupActive, setPopupActive}= useSpotify()
    const {overlayTab, setOverlayTab} = useSpotify();
    var fired = false;
    const handleKeyDown = (event) => {
        if(event.metaKey && event.key == "k") {
            setPopupActive(!popupActive)
            // setSearchQuery("")
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
            if (!document.getElementById('zoomContainer').contains(e.target) && !document.getElementById('toolbar').contains(e.target)){
                setPopupActive(false)
                console.log(document.getElementById('toolbar'))
            } 
        })
        let searchInput = document.getElementById("searchInput")
        // If popup not open...OPEN popup
        if(!popupActive) {
            // searchInput.blur();
            document.addEventListener("keypress", handleKeyDown)
            return () => document.removeEventListener("keypress", handleKeyDown)
        } else {
        // If popup open...CLOSE popup
            // setSearchQuery('')
            // searchInput.focus()
            document.addEventListener("keypress", handleKeyDown)
            return () => document.removeEventListener("keypress", handleKeyDown)
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
        <div id="overlayParent" className={`${popupActive ? "bg-[#0b0b0bb2]" : ""} transition-all fixed left-0 top-0 h-full w-full m-auto text-center pointer-events-none z-30`}>
            <div id="zoomContainer" className={`scale-50 z-30 opacity-0 fixed left-[50%] rounded-md overflow-hidden translate-x-[-50%]  sm:w-[80%] sm:h-[80%] w-full max-w-[1550px] h-[100%] top-[50%] translate-y-[-50%] text-white bg-[#232428] pointer-events-none backdrop-blur-[50px] origin-center  ${!popupActive ? "zoomContainerClose" : "zoomContainerOpen"} `}>
                <p className="hidden">e</p>
                <div className="w-fit">
                    <Icon popupActive={popupActive}  onClickFunc={() => setPopupActive(false)}  icon={"/images/CloseIcon.svg"} myClass={"w-fit m-5 h-[2.1rem]"}></Icon>
                </div>
                <div className="z-1 overflow-hidden h-full">
                {overlayTab === "playlists" && <YourPlaylists></YourPlaylists>}
                {overlayTab === "saved" && <SavedOverlay></SavedOverlay> }
                {overlayTab === "search" && <SearchOverlay></SearchOverlay>}
                </div>
            </div>
        </div>
    )
}