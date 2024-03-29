import { useSpotify } from "@component/context/SpotifyContext"
import { useWindowSize } from "@component/lib/window"
import { getSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { IoBookmarkOutline, IoEllipsisHorizontalSharp } from "react-icons/io5"
export default function SongHeader({currentSong}) {
    const windowSize = useWindowSize()
    const [isLoading, setIsLoading] = useState(true);

    console.log(currentSong.artists)
    const handleImageLoad = () => {
        setIsLoading(false);
        console.log("is loading false")
    };
    if(windowSize.width > 800 && currentSong !== undefined) {
    return (
            <div className="bg-[var(--bg2)] rounded-md  p-6 ">
                <div className="flex h-fit justify-between items-center text-start space-x-4">
                    {/* <Image 
                    unoptimized={true}
                    loader={()=>song?.images?.[0]?.url}
                    src={song?.album?.images?.[0]?.url} width={80} height={80}  alt="Song Image" className="shadow-md w-14 h-14 rounded-md" 
                    priority/> */}
                    <div className="flex gap-4">
                        <div className="IMAGE-PLACEHOLDER rounded-md w-14 h-14 bg-[var(--text)]">
                        <Image 
                            unoptimized={true}
                            placeholder='blur'
                            blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            loader={()=>"https://dummyimage.com/400x400/000/fff"}
                            src={currentSong?.album?.images?.[0].url} width={80} height={80}  alt="Song Image" 
                            className={`${isLoading ? "hidden" : "block"} shadow-md w-14 h-14 rounded-md`} 
                            priority
                            onLoad={handleImageLoad}
                            />
                        </div>
                        <div className="h-14 gap-1 flex flex-col justify-around">
                            <h1 className="text-lg leading-sm line-clamp-1 text-ellipsis">{currentSong.name}</h1>
                            <p className='text-sm opacity-70 leading-sm'>By &#160;
                                {currentSong.artists !== undefined && currentSong.artists.map((artist, index) => (
                                    <React.Fragment key={index}>
                                        { (index ? ', ' : '' ) } 
                                        <a href="" className="underline cursor-pointer">
                                        {artist.name}
                                        </a>
                                    </React.Fragment>
                                ))}
                                </p>
                        </div>
                    </div>
                    <div className="TOOLS flex gap-2">
                        <IoBookmarkOutline className="text-lg stroke-[2rem]"></IoBookmarkOutline>
                        <IoEllipsisHorizontalSharp></IoEllipsisHorizontalSharp>
                    </div>
                </div>
                <hr className="my-6" />
                <div className="flex gap-4">
                    <div className="text-sm">
                        <h3 className="opacity-50">Key</h3>
                        <p className="">Am</p>
                    </div>
                    <div className="text-sm">
                        <h3 className="opacity-50">Tuning</h3>
                        <p className="">EADGBE</p>
                    </div>
                    <div className="text-sm">
                        <h3 className="opacity-50">Tempo</h3>
                        <p className="">120bpm</p>
                    </div>
                    <div className="text-sm">
                        <h3 className="opacity-50">Capo</h3>
                        <p className="">None</p>
                    </div>
                </div>
            </div>
    ) }
    return (
            <div className="bg-[var(--bg2)] rounded-md  p-6 ">
                <div className="flex h-fit justify-between items-center text-start space-x-4">
                    {/* <Image 
                    unoptimized={true}
                    loader={()=>song?.images?.[0]?.url}
                    src={song?.album?.images?.[0]?.url} width={80} height={80}  alt="Song Image" className="shadow-md w-14 h-14 rounded-md" 
                    priority/> */}
                    <div className="flex gap-4">
                        <div className="IMAGE-PLACEHOLDER rounded-md w-14 h-14 bg-[var(--text)]">
                        <Image 
                            unoptimized={true}
                            loader={()=>"https://i.scdn.co/image/ab67616d0000b27323794816d0cdc763a8f834bd"}
                            src={"https://i.scdn.co/image/ab67616d0000b27323794816d0cdc763a8f834bd"} width={80} height={80}  alt="Song Image" className="shadow-md w-14 h-14 rounded-md" 
                            priority/>
                        </div>
                        <div className="h-14 gap-1 flex flex-col justify-around">
                            <h1 className="text-lg leading-[2px]">Song Title</h1>
                            <p className='text-sm opacity-70 leading-[2px]'>By <a className="underline cursor-pointer">Artist</a> </p>
                        </div>
                    </div>
                    <div className="TOOLS flex gap-2">
                        <IoBookmarkOutline className="text-lg stroke-[2rem]"></IoBookmarkOutline>
                        <IoEllipsisHorizontalSharp></IoEllipsisHorizontalSharp>
                    </div>
                </div>
                <hr className="my-6" />
                <div className="flex gap-4">
                    <div className="text-sm">
                        <h3 className="opacity-50">Key</h3>
                        <p className="">Am</p>
                    </div>
                    <div className="text-sm">
                        <h3 className="opacity-50">Tuning</h3>
                        <p className="">EADGBE</p>
                    </div>
                    <div className="text-sm">
                        <h3 className="opacity-50">Tempo</h3>
                        <p className="">120bpm</p>
                    </div>
                    <div className="text-sm">
                        <h3 className="opacity-50">Capo</h3>
                        <p className="">None</p>
                    </div>
                </div>
            </div>
    )
}



export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        session,
      },
    };
  }