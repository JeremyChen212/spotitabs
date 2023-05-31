import Image from "next/image"
import { IoArrowForward } from "react-icons/io5"
import SongCard from "../reusable/SongCard"
import { useWindowSize } from "@component/lib/window"

export default function PlaylistSidebar({playlist}) {
    const windowSize = useWindowSize()
    if(windowSize.width < 0) {
        return (
            <div className="bg-[var(--bg2)] flex flex-col gap-6 h-full overflow-y-scroll rounded-md max-w-md w-[50rem] pr-4 fixed z-40">
                <div className="flex pl-2 gap-6 items-start  relative">
                <div className="p-2 bg-[var(--bg3)] cursor-pointer transition-all ease-in-out hover:brightness-200 absolute rounded-full right-0 top-0 rotate-180">
                  <IoArrowForward className="text-lg text-gray-300"></IoArrowForward>
                </div>
                  <Image 
                    unoptimized={true}
                    loader={()=>playlist.images?.[0].url}
                    src={playlist.images?.[0].url} width={120} height={120}  alt="Song Image" className="max-md:hidden shadow-md w-18 h-18 rounded-md" 
                    priority/>
                  <div className="line-clamp-2 text-ellipse  w-full pr-12 text-start flex flex-col gap-2">
                    <h1 className="text-[1.8rem] font-semibold leading-[2rem] ">
                        {playlist.name}
                    </h1>
                    <p className="text-gray-300">
                      {playlist.owner.display_name}
                    </p>
                  </div>
                </div>
                <hr className="opacity-10" />
                <div>
                {playlist.tracks.items.map((item, index) => (
                    <SongCard song={item.track} key={index} />
                  ))}
                </div>
            </div>
      )
    } else {
        return (
            <div className={`bg-[var(--bg1)]  flex flex-col gap-6 h-full overflow-y-scroll rounded-md max-w-md w-[50rem] pr-4`}>
                <div className="flex pl-2 gap-6 items-start  relative">
                <div className="p-2 bg-[var(--bg3)] cursor-pointer transition-all ease-in-out hover:brightness-200 absolute rounded-full right-0 top-0 rotate-180">
                  <IoArrowForward className="text-lg text-gray-300"></IoArrowForward>
                </div>
                  <Image 
                    unoptimized={true}
                    loader={()=>playlist.images?.[0].url}
                    src={playlist.images?.[0].url} width={120} height={120}  alt="Song Image" className="max-md:hidden shadow-md w-18 h-18 rounded-md" 
                    priority/>
                  <div className="line-clamp-2 text-ellipse  w-full pr-12 text-start flex flex-col gap-2">
                    <h1 className="text-[1.8rem] font-semibold leading-[2rem] ">
                        {playlist.name}
                    </h1>
                    <p className="text-gray-300">
                      {playlist.owner.display_name}
                    </p>
                  </div>
                </div>
                <hr className="opacity-10" />
                <div>
                {playlist.tracks.items.map((item, index) => (
                    <SongCard song={item.track} key={index} />
                  ))}
                </div>
            </div>
      )
    }
    
}