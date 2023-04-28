import Image from "next/image";
import {useSpotify} from '../../context/SpotifyContext'
import { useState } from "react";
import { IoBookmark, IoMenu, IoPerson, IoLibrary } from 'react-icons/io5'

export default function Icon({icon, type, active, onClickFunc, myClass, imgClass}) {
    const [count, setCount] = useState(0);
    const {popupActive, setPopupActive} = useSpotify();
    return (
        <div 
        className="w-fit pointer-events-none"
        onClick={
            onClickFunc
        }>
<button className={` ${myClass}  ${active && popupActive ? "opacity-100" : "opacity-50 hover:opacity-80 "} pointer-events-auto h-full block cursor-pointer active:scale-90 `}
          >
            {type === "icon" ? (
                <div>
                    {'<' + icon + "></" + icon + ">"}
                </div>
            ) : (
                <Image className={`${imgClass} `}
                src={icon}
                alt={icon}
                width={22}
                height={22}
                objectFit="contain"
                /> 
            )}
           
        </button>
        </div>
        
    )
}