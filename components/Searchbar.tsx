import Search from "@component/pages/search"
import SearchInput from "./SearchInput"
import { IoHome } from 'react-icons/io5'
import { IoSearch } from 'react-icons/io5'
import { useSession, signIn } from 'next-auth/react';
import styles from '../styles/Custom.module.scss'
import { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/router';
import { useSpotify } from "@component/context/SpotifyContext";
import { useWindowSize, useWindowPath } from '../lib/window'
import Image from "next/image";
import Profile from "./Profile";
import Button from "./reusable/Button";
import OverlayTab from './OverlayTab';
import Icon from "./reusable/Icon";


export default function Searchbar() {
    const searchInput = useRef(null)
    const {popupActive, setPopupActive} = useSpotify()
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <div className="w-full my-10">
                <input id="searchInput" type="text" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} 
                className="outline-none bg-[#ffffff00] w-full p-5" placeholder="Type a song"/>
                <hr className="opacity-20 z-3"/>
        </div>
    )
}