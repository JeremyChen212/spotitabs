import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext"
import { themes, getTheme, setTheme } from '../../context/Themes';

export default function Chip({children, selected, size, styles, onClickFunc}: any) {
    
    const selectedClass = selected ? "bg-[var(--primary)] text-[var(--bg1)] border-[var(--primary)] " : "hover:opacity-80 bg-[var(--bg3)]"
    console.log(selectedClass)
    
    return (
        <button type="submit" onClick={onClickFunc} className={`${styles} gap-2 whitespace-nowrap flex items-center transition-all h-fit p-1 px-5 ${selectedClass}  text-[0.8rem] opacity-100  rounded-full focus:outline-nonebg-[#1d4e447b]`}>
            <h1>
                {children}
            </h1>
        </button>
    )
}