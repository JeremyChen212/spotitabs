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
        setOverlayTab(tab)
        setPopupActive(true)
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
    useEffect(()=>{

    }, [overlayTab])
      
    return (
        <>
        {windowSize.width > 0 ? (
            <nav className="sticky top-0 z-3 flex h-[2rem] items-center justify-between w-full max-w-[1500px] mx-auto my-5 gap-5">
                {/* <Image
                    src="/images/Spotitabs_Logo_Single.png"
                    alt="spotify logo"
                    width={50}
                    height={96}
                    objectFit="contain"
                    /> */}
                <div className="flex gap-5">
                {/* <Button onClickFunc={() => {showTab("playlist")}} title={"My Playlists"} styles={`${router.pathname == "/library" ? "bg-[#489181]" : ""}`} />
                <Button onClickFunc={() => {showTab("saved")}} title={"Saved"} styles={`${router.pathname == "/library" ? "bg-[#489181]" : ""}`} /> */}
                <div className="flex gap-3">
                <Icon  icon={"/images/LeftIcon.svg"} onClickFunc={() => router.back()}></Icon>
                <Icon icon={"/images/RightIcon.svg"} onClickFunc={() => window.history.forward()}></Icon>
                </div>
                {/* <div className="flex gap-3">
                    <Icon active={checkActiveTab("search")}
                   icon={"/images/HomeIcon.svg"}></Icon>
                    <Icon popupActive={popupActive} active={checkActiveTab("search")} onClickFunc={() => showTab("search")}  icon={"/images/SearchIcon.svg"}></Icon>
                    <Icon popupActive={popupActive} active={checkActiveTab("playlists")} onClickFunc={() => showTab("playlists")} icon={"/images/PlaylistsIcon.svg"}></Icon>
                    <Icon popupActive={popupActive} active={checkActiveTab("saved")} onClickFunc={() => showTab("saved")} icon={"/images/SaveIcon.svg"}></Icon>
                </div> */}
                <div className="flex gap-3">
                    <Icon active={checkPage("/playlist")}
                    icon={"/images/HomeIcon.svg"}></Icon>
                    <Icon popupActive={popupActive} active={checkActiveTab("search")} onClickFunc={() => showTab("search")}  icon={"/images/SearchIcon.svg"}></Icon>
                    <Icon popupActive={popupActive} active={checkActiveTab("playlists")} onClickFunc={() => showTab("playlists")} icon={"/images/PlaylistsIcon.svg"}></Icon>
                    <Icon popupActive={popupActive} active={checkActiveTab("saved")} onClickFunc={() => showTab("saved")} icon={"/images/SaveIcon.svg"}></Icon>
                </div>
                </div>
                <Profile session={session}/>

                {/*               

                  
                <button className={`${router.pathname == "/home" ? "bg-[#489181]" : ""} flex items-center transition-all h-fit p-2.5 bg-[#3c534e] opacity-100 hover:opacity-80 rounded-full focus:outline-nonebg-[#1d4e447b]`}>
                    <IoHome className="text-xl m-auto" height="1em" width="1em"/>
                </button>
                <button className={`${router.pathname == "/library" ? "bg-[#489181]" : ""} gap-2 flex items-center transition-all h-fit p-2 px-5 bg-[#3c534e] opacity-100 hover:opacity-80 rounded-full focus:outline-nonebg-[#1d4e447b]`}>
                    <IoLibrary />
                    <h1>
                        Library
                    </h1>
                </button>
                <button className={`${router.pathname == "/bookmarked" ? "bg-[#489181]" : ""} flex items-center transition-all h-fit p-2.5 bg-[#3c534e] opacity-100 hover:opacity-80 rounded-full focus:outline-nonebg-[#1d4e447b]`}>
                    <IoBookmark className="text-xl m-auto"/>
                </button> */}
                {/* <SearchInput></SearchInput> */}
            </nav>
        ) : (
            <nav className="sticky top-0 z-50 flex items-center justify-between w-full min-w-fit p-6 gap-5">
                <div className="absolute flex-column">
               
                    <button className={`${router.pathname == "/" ? "bg-[#489181]" : ""} flex items-center transition-all h-fit p-2.5 bg-[#3c534e] opacity-100 hover:opacity-80 rounded-full focus:outline-nonebg-[#1d4e447b]`}>
                        <IoHome className="text-xl m-auto" height="1em" width="1em"/>
                    </button>
                    <button className={`${router.pathname == "/home" ? "bg-[#489181]" : ""} gap-2 flex items-center transition-all h-fit p-2 px-5 bg-[#3c534e] opacity-100 hover:opacity-80 rounded-full focus:outline-nonebg-[#1d4e447b]`}>
                        <IoLibrary />
                        <h1>
                            Library
                        </h1>
                    </button>
                    <button className={`${router.pathname == "/home" ? "bg-[#489181]" : ""} flex items-center transition-all h-fit p-2.5 bg-[#3c534e] opacity-100 hover:opacity-80 rounded-full focus:outline-nonebg-[#1d4e447b]`}>
                        <IoBookmark className="text-xl m-auto"/>
                    </button>
                </div>
                <SearchInput></SearchInput>
                <Profile session={session}/>

            </nav>
        )
        }
        </>
    )
}