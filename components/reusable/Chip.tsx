export default function Chip({children, selected, size, styles, onClickFunc}: any) {
    return (
        <button type="submit" onClick={onClickFunc} className={`${styles} gap-2 whitespace-nowrap flex items-center transition-all h-fit p-1 px-5 ${selected ? "bg-bg3 text-bg1" : "hover:opacity-80 text-bg3"} border-2 border-bg3 text-[0.8rem] opacity-100  rounded-full focus:outline-nonebg-[#1d4e447b]`}>
            <h1>
                {children}
            </h1>
        </button>
    )
}