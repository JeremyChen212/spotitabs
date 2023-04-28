import React from "react";
import Image from "next/image";

const PlaylistCard = ({ playlistImage, playlistTitle, artistPreview }) => {
  return (
    <div className="flex bg-[#282828] rounded-lg p-4 w-80 mb-4">
      <div className="flex-none mr-4">
        <Image loader={() => playlistImage} src={playlistImage} width={"120"} height={"120"} alt="Song Image" className="rounded-lg" />
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{playlistTitle}</h2>
        <p className="text-[#A9A9A9]">{artistPreview}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;