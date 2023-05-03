import { useSession } from 'next-auth/react';
import { useState } from "react";
import { useRouter } from 'next/router';
import { useSpotify } from "@component/context/SpotifyContext";
import { useWindowSize } from '../lib/window';
import Icon from "./reusable/Icon";


export default function Navbar() {
    const windowSize = useWindowSize()
    const [selected, setSelected] = useState()
    const mobileMenuOpen = useSpotify()
    const {data: session} = useSession()
    const {overlayTab, setOverlayTab} = useSpotify()
    const {popupActive, setPopupActive} = useSpotify()
    const router = useRouter()
    const handleClick = (path: any) => {
        setSelected(path)
        router.push("/" + path)
    }
    
    function showTab(tab: any) {
        console.log("SHOWING TAB")
        setPopupActive(true)
        if(overlayTab === tab  && popupActive === true) {
            console.log("agege")
            setPopupActive(false)
        }
        setOverlayTab(tab)
        console.log(overlayTab)
    }

    function checkActiveTab(tab: any) {
        console.log(router.asPath)
        if (router.asPath === "/" + tab) {
            return true
        }else {
            return false
        }
    }
    function checkPage(page: any) {
        console.log(router.pathname)
        if (page === router.pathname) {
            return true
        }else {
            return false
        }
    }
    return (
        <div className="absolute top-0 z-50 pointer-events-none left-[50%] translate-x-[-50%] flex h-[2rem] items-center justify-between w-full  ml-28 my-5 gap-5">
            <div id="toolbar" className="flex gap-3 w-fit h-fit z-50 pointer-events-auto">
                {/* <Icon active={checkPage("/playlist")}
                icon={"/images/HomeIcon.svg"}></Icon> */}
                <Icon active={checkActiveTab("explore")} onClickFunc={() => router.push("/explore")}  icon={"/images/SearchIcon.svg"}></Icon>
                <Icon active={checkActiveTab("playlists")} onClickFunc={() => router.push("/playlists")} icon={"/images/PlaylistsIcon.svg"}></Icon>
                <Icon active={checkActiveTab("saved")} onClickFunc={() => router.push("/saved")} icon={"/images/SaveIcon.svg"}></Icon>
            </div>
        </div>
        
    )
}