// import useSWR from 'swr';
// import { getSession } from 'next-auth/react';
// import { useSpotify } from './SpotifyContext';

// export default function usePlaylists () {
//     const session = getSession()
//     const {playlists} = useSpotify();
//     const { data, error, isLoading } = useSWR(`/api/playlists/`)
//     console.log("FETCHING USER PLAYLISTS")
//     console.log(data)
//     return {
//       user: data,
//       isLoading,
//       isError: error
//     }
// }