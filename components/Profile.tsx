import { IoPerson, IoChevronDown, IoExit, IoSettingsSharp } from 'react-icons/io5';
import styles from '../styles/custom.module.scss';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function dropdownLink({icon, title}: any) {
    return (
        <li className="z-100 cursor-pointer whitespace-nowrap transition-all rounded-sm flex gap-2 px-6 py-2 hover:bg-[#235147] w-full min-w-fit">
            <IoSettingsSharp className="text-2xl text-[#ffffff6e]" />
            {title}
        </li>
    )
}

export default function Profile({session}: any) {
    const handleProfileClick = () => {
        const dropdown = document.getElementById(styles.dropdown);
        dropdown?.classList.toggle("scale-100")
    }
    const handleMouseEvent = (e: any) => {
        e.persist();
        const dropdown = document.getElementById(styles.dropdown);
        dropdown?.classList.remove("scale-100")
      };
    const handleLogin = () => {
        signIn("spotify", { callbackUrl: "http://localhost:3000/" });
    };
    useEffect(() => {
        let dropdown = document.getElementById(styles.dropdown)
        document.addEventListener("mousedown", (event) => {
            // @ts-ignore: Object is possibly 'null'.
            if (!dropdown.contains(event.target)) {
                dropdown?.classList.remove("scale-100")
            } 
          });
      }, []);


    if(session) {
        return (
            <div className="z-100 relative group inline-block h-fit ">
                <button 
                
                    className="flex gap-2 z-40 curor-pointer items-center w-fit transition-all h-fit p-0 rounded-full focus:outline-nonebg-[#1d4e447b]"
                    onClick={handleProfileClick}
                    >
                    <div className="imagecn overflow-hidden w-10 h-10 rounded-full  border-2 border-bg1">
                        {session?.user?.image === undefined ? (
                            <IoPerson className="text-2xl m-auto" height="1em" width="1em"/>
                        ): 
                        (
                            <Image loader={() => session.user.image} className="w-auto h-full" src={session.user.image} width={"10"} height={"10"} alt="usepfp" />
                        )}
                    </div>
                    <span className="text-sm hidden font-bold tracking-wide">
                        {session?.user?.name}
                    </span>
                    <span>
                        <IoChevronDown></IoChevronDown>
                    </span>
                </button>
                <ul 
                // onMouseLeave={handleMouseEvent}
                    id={styles.dropdown}
                    className={`bg-[#337263] z-200 mt-2 w-fit border-[#337263] rounded-sm transform scale-0 top-[3rem] right-0 absolute transition duration-150 ease-in-out flex-column gap-2 p-3 origin-top-right min-w-fit items`}
                >
                    <li className="cursor-pointer whitespace-nowrap transition-all rounded-sm px-3 flex gap-2 items-center py-2 hover:bg-[#235147] w-full justify-start min-w-fit ">
                        <IoSettingsSharp className="text-xl text-[#ffffff6e]" />
                        Settings
                    </li>
                    <li className="cursor-pointer whitespace-nowrap transition-all rounded-sm px-3 flex gap-2 items-center py-2 hover:bg-[#235147] w-full justify-start min-w-fit ">
                        <IoSettingsSharp className="text-xl text-[#ffffff6e]" />
                        Your Profile
                    </li>
                    <div className='border opacity-20 my-1'></div>
                    <li 
                        onClick={()=>signOut()}
                        className="cursor-pointer whitespace-nowrap transition-all rounded-sm px-3 flex gap-2 items-center py-2 hover:bg-[#235147] w-full justify-start min-w-fit">
                        <IoExit className="text-xl text-[#ffffff6e]" />
                        Log Out
                    </li>
                </ul>
            </div>
        ) 
    } else {
        return (
            <button 
                className="flex gap-2 items-center w-fit transition-all px-5 bg-[#337264] hover:opacity-80 h-full rounded-full focus:outline-nonebg-[#1d4e447b] "
                onClick={handleLogin}>
                    Login
            </button>
        )
    }
   
}