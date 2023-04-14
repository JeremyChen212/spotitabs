import Search from "@component/pages/search"
import SearchInput from "./SearchInput"
import { IoHome } from 'react-icons/io5'
import { IoBookmark, IoMenu, IoPerson, IoLibrary } from 'react-icons/io5'
import { useSession, signIn } from 'next-auth/react';
import styles from '../styles/Custom.module.scss'
import { useState } from "react"
import { useRouter } from 'next/router';
import { useSpotify } from "@component/context/SpotifyContext";
import { useWindowSize, useWindowPath } from '../lib/window'
import Image from "next/image";
import Profile from "./Profile";
export default function Navbar() {
    const window = useWindowSize()
    const [selected, setSelected] = useState()
    const mobileMenuOpen = useSpotify()
    const {data: session} = useSession()
    const router = useRouter()
    const handleClick = (path) => {
        setSelected(path)
        router.push("/" + path)
    }
  
   
      
    return (
        <>
        {window.width >= 640 ? (
            <nav className="sticky top-0 z-50 flex h-[5.5rem] items-center justify-between w-full min-w-fit p-6 gap-5">
                <Image
                    src="/images/Spotitabs_Logo_Single.png"
                    alt="spotify logo"
                    width={50}
                    height={96}
                    objectFit="contain"
                    />
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
                </button>
                <SearchInput></SearchInput>
                <Profile session={session}/>
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