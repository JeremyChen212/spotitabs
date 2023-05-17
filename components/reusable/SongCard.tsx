import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function songCard({ song }: any) {
  // Get all the <a> tags on the page
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const regex = /(<([^>]+)>)/ig;

  return (
    <>
     <Link href={`/song/${song.id}`} className="flex flex-col relative cursor-pointer  hover:scale-[1.01] transition-all rounded-lg h-fit overflow-hidden w-full gap-4">
      <div className={`w-full animated-border-2 rounded-lg overflow-hidden`}>
          <Image 
            onLoadingComplete={handleLoadComplete}
            unoptimized={true}
            loader={()=>song?.images?.[0]?.url}
            src={song?.images?.[0]?.url} width={112} height={112}  alt="Song Image" className="h-full w-full object-cover" priority/>
        </div> 
          <div className="w-full flex-1">
            <h2 className="text-lg font-medium mb-[0.15rem] w-full line-clamp-1 text-ellipse">{song.name}</h2>
            <div className="text-[#A9A9A9] pointer-events-none line-clamp-2 text-ellipse">
                by {song?.owner.display_name}
            </div>
          </div>
       
     </Link>
    </>
  )
};
