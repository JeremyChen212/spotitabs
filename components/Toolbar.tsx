import Search from "@component/pages/search"
import SearchInput from "./SearchInput"
import { IoHome } from 'react-icons/io5'
import { IoBookmark, IoMenu, IoPerson, IoLibrary } from 'react-icons/io5'
import { useSession, signIn } from 'next-auth/react';
import styles from '../styles/Custom.module.scss'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import { useSpotify } from "@component/context/SpotifyContext";
import { useWindowSize, useWindowPath } from '../lib/window'
import Image from "next/image";
import Profile from "./Profile";
import Button from "./reusable/Button";
import OverlayTab from './OverlayTab';
import Icon from "./reusable/Icon";


export default function Navbar() {
    const windowSize = useWindowSize()
    const [selected, setSelected] = useState()
    const mobileMenuOpen = useSpotify()
    const {data: session} = useSession()
    const {overlayTab, setOverlayTab} = useSpotify()
    const {popupActive, setPopupActive} = useSpotify()
    const router = useRouter()
    const handleClick = (path) => {
        setSelected(path)
        router.push("/" + path)
    }
    
    function showTab(tab) {
        console.log("SHOWING TAB")
        setPopupActive(true)
        if(overlayTab === tab  && popupActive === true) {
            console.log("agege")
            setPopupActive(false)
        }
        setOverlayTab(tab)
        console.log(overlayTab)
    }

    function checkActiveTab(tab) {
        if (tab === overlayTab) {
            return true
        }else {
            return false
        }
    }
    function checkPage(page) {
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
                <Icon popupActive={popupActive} active={checkActiveTab("search")} onClickFunc={() => showTab("search")}  icon={"/images/SearchIcon.svg"}></Icon>
                <Icon popupActive={popupActive} active={checkActiveTab("playlists")} onClickFunc={() => showTab("playlists")} icon={"/images/PlaylistsIcon.svg"}></Icon>
                <Icon popupActive={popupActive} active={checkActiveTab("saved")} onClickFunc={() => showTab("saved")} icon={"/images/SaveIcon.svg"}></Icon>
            </div>
        </div>
        
    )
}