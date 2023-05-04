import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const PlaylistCard = ({ playlist }: any) => {
  // Get all the <a> tags on the page
  var parse = require('html-react-parser');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const regex = /(<([^>]+)>)/ig;
  const playlistDescription = playlist?.description.replace(regex, "");

  return (
    <>
     <Link href={`/playlist/${playlist.id}`} className="flex cursor-pointer hover:scale-[1.01] hover:bg-[#333232] transition-all grid-cols-3 bg-[#282828] p-4 rounded-lg h-[9rem] overflow-hidden min-w-[20rem] w-full  gap-4">
       <div className="h-[7rem] w-[7rem] rounded-lg bg-[#343333] overflow-hidden">
         <Image 
          onLoadingComplete={handleLoadComplete}
          unoptimized={true}
          loader={()=>playlist?.images?.[0]?.url}
          src={playlist?.images?.[0]?.url} width={"10"} height={"10"}  alt="Song Image" className="h-full  w-full object-cover" priority/>
       </div> 
       <div className="w-full max-w-10 flex-1">
         <h2 className="text-lg font-semibold mb-2 w-full line-clamp-2 text-ellipse">{playlist.name}</h2>
         {playlist?.description ? (
            <div className="text-[#A9A9A9]  w-full max-w-full pointer-events-none line-clamp-2 text-ellipse">
              {playlistDescription}
            </div>
          ) : (
            <div className="text-[#A9A9A9] pointer-events-none line-clamp-2 text-ellipse">
              by {playlist?.owner.display_name}
            </div>
          )}
       </div>
     </Link>
    </>
  )
};

export default PlaylistCard;