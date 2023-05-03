import { useSpotify } from '../../context/SpotifyContext';
import { useState } from "react";
import { IoMenu } from 'react-icons/io5';

export default function Icon() {
    const [count, setCount] = useState(0);
    const {popupActive, setPopupActive} = useSpotify();
    const {menuOpen, setMenuOpen} = useSpotify();
   
    return (
        <div 
        className="w-10 h-10 pointer-events-none"
        // onClick={() =>setMenuOpen(true)}
        >
        <button className={`opacity-50 hover:opacity-80 pointer-events-auto h-full block cursor-pointer active:scale-90 `}
          >
            <IoMenu className="h-full w-full"></IoMenu>
        </button>
        </div>
        
    )
}