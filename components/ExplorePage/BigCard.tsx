import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SplineObject1 from "../SplineObject1";
import { useEffect } from "react";
const PlaylistCard = ({ playlist, hidden }: any) => {
  // Get all the <a> tags on the page
  var parse = require('html-react-parser');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const handleLoadComplete = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      `--${playlist.colorName}-stroke`,
      `${playlist.color}`
    );
    console.log(root.style)
  }, [])  
  return (
    <>
     <Link id="playlist.id"  border-color={playlist.color} href={`/playlist/${playlist.id}`} className={`${hidden && "hidden lg:flex"} ${playlist.colorName}-stroke flex relative flex-col group cursor-pointer hover:scale-[1.01] max-[375px]:h-[13rem] h-[16rem] md:h-[13rem] xl:h-[16rem]  hover:bg-[#333232] animated-border-1 transition-all bg-[var(--${playlist.color}-bg)] p-4 rounded-lg text-center overflow-hidden w-full gap-4`}>
        <h2 className="text-lg font-medium mb-2 w-full line-clamp-2 text-ellipse">{playlist.name}</h2>
        <div className="h-auto absolute mt-8 left-[50%] translate-x-[-50%] transition-[inherit] group-hover:mt-6 w-full max-w-[14rem] m-auto rounded-lg overflow-hidden">
          <Image 
            onLoadingComplete={handleLoadComplete}
            unoptimized={true}
            loader={()=>playlist?.images?.[0]?.url}
            src={playlist.image} width={112} height={112}  alt="Song Image" className="h-full  w-full object-cover" 
            priority/>
        </div> 
       
     </Link>
    </>
  )
};

export default PlaylistCard;