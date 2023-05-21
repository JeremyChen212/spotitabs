import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSpotify } from "@component/context/SpotifyContext";
import { useWindowSize } from '../lib/window';
import Profile from "./Profile";
import Icon from "./reusable/Icon";
import Hamburger from './reusable/Hamburger';

export default function Navbar() {
    const windowSize = useWindowSize()
    const [selected, setSelected] = useState("")
    const [mobileNav, setMobileNav] = useState(false)
    const {data: session} = useSession()
    const {overlayTab, setOverlayTab} = useSpotify()
    const {popupActive, setPopupActive} = useSpotify()
    const router = useRouter()
    const {setMenuOpen, menuOpen} = useSpotify()
    const handleClick = (path: string) => {
        setSelected(path)
        router.push("/" + path)
    }
    const newPath = router.pathname.replace(/\//g, "").toUpperCase();
    function showTab(tab: string) {
        console.log("SHOWING TAB")
        setPopupActive(true)
        if(overlayTab === tab  && popupActive === true) {
            console.log("agege")
            setPopupActive(false)
        }
        setOverlayTab(tab)
        console.log(overlayTab)
    }
    console.log(router.basePath)
    
    function checkActiveTab(tab: any) {
        const path = router.asPath.split('/')[1]; // Extract the first part of the path
        console.log(path)
        if (path === tab) {
            return true
        }else {
            return false
        }
    }
    function checkPage(page: string) {
        console.log(router.pathname)
        if (page === router.pathname) {
            return true
        }else {
            return false
        }
    }
    useEffect(() => {
        console.log(menuOpen)
        if(menuOpen) {
            console.log(menuOpen)
            document.querySelector('html')?.classList.add("mobile")
        } else {
            document.querySelector('html')?.classList.remove("mobile")
        }
      }, [menuOpen, windowSize]);
      
    return (
        <>
        {windowSize.width > 640 ? (
            <nav id="navbar" className="fixed z-50 top-0 flex h-[2rem] w-fit mx-auto my-5 gap-5">
                {/* <Image
                    src="/images/Spotitabs_Logo_Single.png"
                    alt="spotify logo"
                    width={50}
                    height={96}
                    objectFit="contain"
                    /> */}
                <div className="flex items-center bg-[#232121] h-11 left-[50%] translate-x-[-50%] fixed px-6 py-3 shadow- rounded-full gap-5 z-[-1]">
                {/* <Button onClickFunc={() => {showTab("playlist")}} title={"My Playlists"} styles={`${router.pathname == "/library" ? "bg-[#489181]" : ""}`} />
                <Button onClickFunc={() => {showTab("saved")}} title={"Saved"} styles={`${router.pathname == "/library" ? "bg-[#489181]" : ""}`} /> */}
                <div className="flex gap-2 h-4 items-center">
                    <Icon icon={"/images/LeftIcon.svg"}  onClickFunc={() => router.back()} ></Icon>
                    <Icon icon={"/images/RightIcon.svg"}   onClickFunc={() => window.history.forward()}></Icon>
                </div>
                <div className="flex gap-3 h-full">
                    {/* <Icon active={checkActiveTab("search")}
                   icon={"/images/HomeIcon.svg"}></Icon> */}
                      <Icon active={checkActiveTab("search")} myClass={'search-icon'} onClickFunc={() => router.push("/search")}  icon={"/images/SearchIcon.svg"}></Icon>
                    <Icon active={checkActiveTab("playlists")} onClickFunc={() => router.push("/playlists")} icon={"/images/PlaylistsIcon.svg"}></Icon>
                    <Icon active={checkActiveTab("saved")} onClickFunc={() => router.push("/saved")} icon={"/images/SaveIcon.svg"}></Icon>
                    <Profile session={session}/>
                </div>
                </div>
                {/* <div className='flex gap-2 items-center absolute left-[50%] opacity-80 translate-x-[-50%] '>
                    <hr className="w-4 rounded-full border" />
                    <h3>{router.pathname.includes('/search/') ? `Search results for ${router.query.pid}` : newPath}</h3>
                    <hr className="w-4 rounded-full border" />
                </div>
                <Profile session={session}/> */}
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
            <>
            <nav id="navbar" className="fixed group cursor-pointer z-30 bottom-4 left-[50%] translate-x-[-50%] flex h-fit w-fit max-w-[1500px] mx-auto gap-5">
                <Hamburger></Hamburger>
            </nav>
            <div id='menu-overlay' className={`z-20 ${menuOpen ? "flex" : "hidden"}  origin-top-right absolute left-0 top-0 w-[100vw] h-[100vh]`}>
                <div className="flex gap-3 h-[2rem]">
                    {/* <Icon active={checkActiveTab("search")}
                   icon={"/images/HomeIcon.svg"}></Icon> */}
                    <Icon active={checkActiveTab("search")} myClass={'search-icon'} onClickFunc={() => router.push("/search")}  icon={"/images/SearchIcon.svg"}></Icon>
                    <Icon active={checkActiveTab("playlists")} onClickFunc={() => router.push("/playlists")} icon={"/images/PlaylistsIcon.svg"}></Icon>
                    <Icon active={checkActiveTab("saved")} onClickFunc={() => router.push("/saved")} icon={"/images/SaveIcon.svg"}></Icon>
                    <Profile session={session}/>
                </div>
            </div>
            </>
        )
        }
        </>
    )
}