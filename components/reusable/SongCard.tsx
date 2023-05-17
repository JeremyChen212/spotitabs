import React from 'react';
import Image from 'next/image';
const SongCard = ({ song }) => {
    const formatDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
    const duration = formatDuration(song.duration_ms);


//   const { name, artist, album, duration, coverImage } = song;
  return (
    <div className="grid max-sm:grid-cols-8 grid-cols-12 bg-[var(--bg-2-color)] cursor-pointer p-2 px-4 rounded-lg items-center text-start w-full justify-between">
        <div className="flex col-span-6 items-center text-start space-x-4">
        <Image 
                unoptimized={true}
                loader={()=>song?.images?.[0]?.url}
                src={song?.album?.images?.[0]?.url} width={112} height={112}  alt="Song Image" className="shadow-md w-16 h-16 rounded-md" 
                priority/>
        <div>
            <h3 className="text-lg font-bold">{song.name}</h3>
            <p className="text-sm text-gray-500">
                {song.artists.map((artist, index) => (
                    <React.Fragment key={index}>
                        { (index ? ', ' : '' ) } 
                        {artist.name}
                    </React.Fragment>
                ))}
            </p>
        </div>
    </div>
    <p className="text-sm max-sm:hidden col-span-4 text-gray-500">{song?.album?.name}</p>
    <p className="text-sm justify-self-end col-span-2 text-gray-500">{duration}</p>
    </div>
  );
};

export default SongCard;
