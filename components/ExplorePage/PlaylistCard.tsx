import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const PlaylistCard = ({ playlist, hidden }: any) => {
  // Get all the <a> tags on the page
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const regex = /(<([^>]+)>)/ig;
  const playlistDescription = playlist?.description.replace(regex, "");

  return (
    <>
     <Link id={playlist.id} href={`/playlist/${playlist.id}`} className={`playlistCard ${hidden && "lg:max-xl:hidden"}  grid grid-cols-4 sm:flex sm:flex-col relative cursor-pointer  hover:scale-[1.01] transition-all rounded-lg h-full overflow-hidden w-full gap-4`}>
      <div className={`w-full animated-border-2 h-full rounded-lg overflow-hidden`}>
        {playlist.images.length > 0 ? (
          <Image 
            onLoadingComplete={handleLoadComplete}
            unoptimized={true}
            loader={()=>playlist?.images?.[0]?.url}
            src={playlist?.images?.[0]?.url} width={112} height={112}  alt="Song Image" className="h-full w-fit  object-cover" 
          priority/>
        ) : (
          <div className="bg-[rgb(35,33,33)] col-span-1 w-full h-full">
            <Image 
            onLoadingComplete={handleLoadComplete}
            unoptimized={true}
            loader={()=>"/Icons/music-player-fill.svg"}
            src={"/Icons/music-player-fill.svg"} width={112} height={112}  alt="Song Image" className="w-[40%] h-fit absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] m-auto object-cover" 
          priority/>
          </div>
        )}
          
        </div> 
          <div className="w-full flex-1 text-start sm:text-center col-span-3">
            <h2 className="text-lg font-medium mb-[0.15rem] w-full line-clamp-1 text-ellipse">{playlist.name}</h2>
            {playlist?.description ? (
                <div className="text-[#A9A9A9]  w-full max-w-full pointer-events-none line-clamp-1 text-ellipse">
                  {playlistDescription}
                </div>
              ) : (
                <div className="text-[#A9A9A9] pointer-events-none line-clamp-2 text-ellipse">
                  by {playlist?.owner.display_name}
                </div>
              )}
          </div>
       
     </Link>
     {/* <Link href={`/playlist/${playlist.id}`} className="flex relative animated-border-2 cursor-pointer hover:scale-[1.01] hover:bg-[#333232] transition-all grid-cols-3 bg-[#282828] p-4 rounded-lg h-[9rem] overflow-hidden w-full  gap-4">
       <div className="h-[7rem] w-[7rem] rounded-lg bg-[#343333] overflow-hidden">
         <Image 
          onLoadingComplete={handleLoadComplete}
          unoptimized={true}
          loader={()=>playlist?.images?.[0]?.url}
          src={playlist?.images?.[0]?.url} width={112} height={112}  alt="Song Image" className="h-full  w-full object-cover" priority/>
       </div> 
       <div className="w-full flex-1">
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
     </Link> */}
    </>
  )
};

export default PlaylistCard;