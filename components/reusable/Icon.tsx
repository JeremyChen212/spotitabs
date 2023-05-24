import Image from "next/image";
import { useSpotify } from '../../context/SpotifyContext';
import { useState } from "react";
import { ReactElement } from 'react'
import { 
faCoffee,
faBookOpenReader
 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// export default function MyComponent(): ReactElement {
// return <FontAwesomeIcon icon={faCoffee} />
// }

interface  IconProps{
    icon:string,
    type?:string,
    active?: boolean,
    onClickFunc: any,
    myClass?: string,
    imgClass?: string,
    text?: string
}

export default function Icon(Props: IconProps) {
    const { icon, type= "img", active=false, onClickFunc=";", myClass="", imgClass="", text=""} = Props;   // you can use let, however const is recommended
    const [count, setCount] = useState(0);
    const {popupActive, setPopupActive} = useSpotify();
   
    return (
        // <div 
        // className={`h-full w-full relative group inline-block text-center ${active && "active"}`}
        // onClick={
        //     onClickFunc
        // }>
        <button 
            onClick={
                onClickFunc
            } className={`${myClass}  ${active ? "opacity-100" : "opacity-50 hover:opacity-80 "} items-center relative h-full w-fit flex ${text && "gap-4"} cursor-pointer active:scale-90 `}
          >
            {type === "icon" ? (
                <div>
                    {'<' + icon + "></" + icon + ">"}
                </div>
            ) : (
                <Image className={`${imgClass}  object-fit-contain  w-6 h-full`}
                src={icon}
                alt={icon}
                width={"22"}
                height={"22"}
                />
                // <FontAwesomeIcon icon={faBookOpenReader} />
            )}
            <h1 className="text-2xl">{text}</h1>
        </button>
        // </div>
        
    )
}