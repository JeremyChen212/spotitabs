import { useSpotify } from '../../context/SpotifyContext';
import { useEffect, useState } from "react";
import { IoMenu } from 'react-icons/io5';

export default function Icon() {
    const [count, setCount] = useState(0);
    const {popupActive, setPopupActive} = useSpotify();
    const {menuOpen, setMenuOpen} = useSpotify();
    const [checked, setChecked] = useState(false)

    function handleChange() {
        setMenuOpen(!menuOpen)
    }
   
   
    return (
            // <div className="flex cursor-pointer bg-[#232121] p-5">
            <>
            <label htmlFor="hamburger" className={`group transition-[cubic-bezier(0.8, 0, 1, 1)] ease-in duration-5 z-40 w-fit h-fit bg-[#292C35] p-5 pointer-events-auto cursor-pointer active:scale-90rounded-full rounded-full`}
                >
                <div className=" w-7 h-7 group-hover:opacity-80 opacity-50  relative">
                    <input id='hamburger' type="checkbox" checked={menuOpen} onChange={handleChange} className="sr-only peer"/>
                    {/* <div className=' w-14 h-14 bg-[#181818] rounded-full top-[50%] left-[50%]'></div> */}
                    <div className='transition-[inherit] peer-checked:hidden absolute top-0 left-0 group-hover:left-[-50%] group-hover:opacity-0 rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    <div className='transition-[inherit] peer-checked:rotate-45 peer-checked:top-[50%] peer-checked:left-[50%] peer-checked:translate-y-[-50%] peer-checked:translate-x-[-50%] peer-checked:w-8 absolute top-0 left-[50%] translate-x-[-50%] group-hover:w-8 rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    <div className='transition-[inherit] peer-checked:hidden absolute top-0 right-0 group-hover:right-[-50%]  group-hover:opacity-0 rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    <div className='transition-[inherit] peer-checked:hidden absolute top-[50%] left-0 translate-y-[-50%] group-hover:left-[-50%]  group-hover:opacity-0 rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    <div className='transition-[inherit] peer-checked:w-[0.4rem] peer-checked:opacity-0 absolute top-[50%] group-hover:w-8  left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    <div className='transition-[inherit] peer-checked:hidden absolute top-[50%] right-0 translate-y-[-50%] group-hover:right-[-50%]  group-hover:opacity-0 rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    <div className='transition-[inherit] peer-checked:hidden absolute bottom-0 left-0 group-hover:left-[-50%]  group-hover:opacity-0 rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    <div className='transition-[inherit] peer-checked:-rotate-45 peer-checked:w-8 peer-checked:top-[50%] peer-checked:left-[50%] peer-checked:translate-y-[-50%] peer-checked:translate-x-[-50%] absolute bottom-0 group-hover:w-8 left-[50%] translate-x-[-50%] rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    <div className='transition-[inherit] peer-checked:hidden absolute bottom-0 right-0 group-hover:right-[-50%]  group-hover:opacity-0 rounded-full w-[0.4rem] h-[0.4rem] border-[white] border-[0.1rem]'></div>
                    {/* <IoMenu className="h-full w-full"></IoMenu> */}
                </div>
                
            </label>
            {/* // </div> */}
            </>
           
    )
}