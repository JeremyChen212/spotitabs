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
    text?: string,
    id?: string
}

export default function Icon(Props: IconProps) {
    const { icon, type= "img", active=false, onClickFunc=";", myClass="", imgClass="", text="", id=""} = Props;   // you can use let, however const is recommended
    const [count, setCount] = useState(0);
    const {popupActive, setPopupActive} = useSpotify();
    
    return (
        // <div 
        // className={`h-full w-full relative group inline-block text-center ${active && "active"}`}
        // onClick={
        //     onClickFunc
        // }>
        <button  id={id}
            onClick={
                onClickFunc
            } className={`${myClass} ${active && "active "} group items-center relative z-20 h-full w-fit flex ${text && "gap-4"} cursor-pointer `}
          >
            {type === "icon" ? (
                <div>
                    {'<' + icon + "></" + icon + ">"}
                </div>
            ) : (
                <Image className={`${imgClass} ${active ? "opacity-100" : "opacity-50"} group-active:scale-90 object-fit-contain  w-6 h-full`}
                src={icon}
                alt={icon}
                width={"22"}
                height={"22"}
                />
                // <FontAwesomeIcon icon={faBookOpenReader} />
            )}
            <span className="opacity-0 group-hover:opacity-100 pointer-events-none inline-block text-[white] text-[0.75rem] absolute top-[100%] transition-all bg-[#13151b] whitespace-nowrap rounded-md px-4 py-2 left-[50%] translate-x-[-50%] group-hover:visible group-hover:top-[140%]">{text}</span>
        </button>
        // </div>
        
    )
}