// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useSpotify } from "../../context/SpotifyContext";
// import styles from '../styles/Custom.module.css'
// import { getSession, useSession } from "next-auth/react";
// import { getUsersPlaylists } from '../../lib/spotify'
// import Card from "../Card";
// import { SkeletonCard } from "../SkeletonCard";
// function ForYou() {
//     const router = useRouter();
//     const { status, data: session } = useSession()
//     const { playlists, fetchPlaylists } = useSpotify();
//     const { topArtists, fetchTopArtists } = useSpotify();
//     const { topGenres, getTopGenres } = useSpotify();
//     // const { playlistComponent, setPlaylistComponent } = useState();
//     // const [playlists, setPlaylists] = useState();
//     const spotifyApi = useSpotify()
//     const { spinner } = useSpotify()
//     const skeletonCount = 20
//     useEffect(() => {
//         if (topArtists.length === 0) {
//             // fetchTopArtists()
//         }
//         if(topGenres.length === 0) {
//             getTopGenres()
//         }
//         console.log(topGenres)
//         console.log(topArtists)
//     }, []);

//     if (spinner) {
//         return (
//             <div className={`grid w-full md:px-0  transition-all gap-[1.5rem] max-w-[50rem] sm:grid-cols-4 grid-cols-1 `}>
//                 {Array(skeletonCount).fill(<SkeletonCard />)}
//             </div>
//         )
//       }
//     if(topArtists.length > 0 && topGenres.length > 0) {
//     return (
//         <>
//         <div 
//         // className={`grid transition-all grid-cols-1 gap-[1.5rem] xl:grid-cols-4 max-w-[50rem] lg:grid-cols-3 md:grid-cols-2 xl`}
//         className="flex px-5 h-[13rem] gap-4 overflow-x-scroll w-full">
//             {topArtists.map((artist, index) => (
//                 <h1 key={artist}>{artist.name}</h1>
//             ))}
//             {topGenres.map((genre, index) => (
//                 <h1 key={genre}>{genre}</h1>
//             ))}
//         </div>
       
//     </> 
//       )
//     } else {
//         <div>
//             loading...
//         </div>
//     }
// }


// export default ForYou