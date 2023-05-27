import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
const SongCard = ({ song }) => {
    const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
    const [dimensions, setDimensions] = useState<any>({ width: 0})
    const duration = formatDuration(song.duration_ms);
      const ref = useRef<HTMLInputElement>(null);
      useLayoutEffect(()=>{
        if(ref.current) {
            setDimensions({width: ref.current.offsetWidth})
        }
      }, [])
//   const { name, artist, album, duration, coverImage } = song;
  return (
    <div ref={ref} className={`grid h-fit max-sm:grid-cols-8 ${dimensions.width < 500 ? "grid-cols-8" : "grid-cols-12"}  grid-cols-12 hover:bg-[var(--bg2)] cursor-pointer p-2 rounded-lg items-center text-start w-full justify-between`}>
        <div className="flex h-fit col-span-6 items-center text-start space-x-4">
        <Image 
                unoptimized={true}
                loader={()=>song?.images?.[0]?.url}
                src={song?.album?.images?.[0]?.url} width={80} height={80}  alt="Song Image" className="shadow-md w-14 h-14 rounded-md" 
                priority/>
        <div className="h-full gap-1 flex flex-col justify-between">
            <h3 className="text-lg font-normal line-clamp-1 text-ellipse">{song.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-1 text-ellipse">
                {song.artists.map((artist, index) => (
                    <React.Fragment key={index}>
                        { (index ? ', ' : '' ) } 
                        {artist.name}
                    </React.Fragment>
                ))}
            </p>
        </div>
    </div>
    <p className={`${dimensions.width < 500 ? "hidden" : "flex"} text-sm max-sm:hidden col-span-4 text-gray-500`}>{song?.album?.name}</p>
    <p className="text-sm justify-self-end col-span-2 text-gray-500 w-12">{duration}</p>
    </div>
  );
};

export default SongCard;
