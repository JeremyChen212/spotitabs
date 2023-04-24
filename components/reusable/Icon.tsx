import Image from "next/image";
import {useSpotify} from '../../context/SpotifyContext'
import { useState } from "react";

export default function Icon({icon, active, onClickFunc, myClass, imgClass}) {
    const [count, setCount] = useState(0);
    const {popupActive, setPopupActive} = useSpotify();
    return (
        <button className={` ${myClass} h-full block cursor-pointer ${active ? "" : "active:scale-90"}`}
        onClick={
            onClickFunc
            }>
            <Image className={`${imgClass}  ${active && popupActive ? "opacity-100" : "opacity-50 hover:opacity-80 "}`}
            src={icon}
            alt={icon}
            width={22}
            height={22}
            objectFit="contain"
            /> 
        </button>
    )
}