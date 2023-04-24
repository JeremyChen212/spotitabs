import { useSpotify } from "../context/SpotifyContext";
import { useState, useEffect } from "react";
import {IoClose} from "react-icons/io5"
import Heading from "./Heading";
import PlaylistDashboard from "./PlaylistDashboard";
export default function OverlayTab() {
    const spotifyApi = useSpotify()
    const {overlayTab, setOverlayTab} = useSpotify();

    return(
        <div className={`${overlayTab === "" && " scale-0 opacity-0"} absolute z-30 transition-all w-[100vw] origin-top  right-0 h-full bg-bg2 `}>
            <IoClose onClick={()=> {setOverlayTab("")}} className="text-3xl absolute top-16 left-16"></IoClose>
            <div className="w-fit mt-20 m-auto">
                {overlayTab === "" &&
                    <h1>fiyf</h1>
                }
                {overlayTab === "playlist" &&
                <>
                    <Heading className={"text-center w-full"} text={"My Playlists"} />
                    <PlaylistDashboard ></PlaylistDashboard>
                </>
                }
                {overlayTab === "saved" &&
                    <h1>Saved</h1>
                }
            </div>
            
        </div>
        
    )
    // if(overlaytab === "") {
    //     return (
    //         <h1>agilegi</h1>
    //     )
    // } else {
    //     <h1>Playlists</h1>
    // }
    // if(overlaytab === "playlist") {
    //         <h1 className="text-center">Your Playlists</h1>
    // } 
    // if(overlaytab === "saved") {
    //     <div>
    //         <h1 className="text-center">Saved</h1>
    //     </div>
    // }
}