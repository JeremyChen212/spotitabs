export default function Button({title, styles, onClickFunc}: any) {
    
  
    return (
        <button type="submit" onClick={onClickFunc} className={`${styles} gap-2 whitespace-nowrap flex items-center transition-all h-fit p-2 px-5 bg-bg3 text-bg1 opacity-100 hover:opacity-80 rounded-full focus:outline-nonebg-[#1d4e447b]`}>
            <h1>
                {title}
            </h1>
        </button>
    )
}