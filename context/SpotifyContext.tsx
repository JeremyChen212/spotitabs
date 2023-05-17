import  { Children, createContext, useState, useContext } from 'react'
import axios from 'axios'
import { PlaylistType, SearchResults } from '../types/types'
import { Dispatch, SetStateAction, useMemo } from "react"
import { getUsersPlaylists } from '@component/lib/spotify'
import {useSession} from 'next-auth/react'
import { useEffect } from 'react'
import { customGet } from '@component/utils/customGet'
import getSession from 'next-auth'

// These are the props that context will take in
interface ContextProps {
  playlists: PlaylistType[],
  fetchPlaylists: () => void
  searchResults : SearchResults[],
  fetchSearchResults: () => void,
  spinner: boolean,
  setSpinnerState: any,
  query: string,
  setQuery: Dispatch<SetStateAction<string>>,
  mobileMenuOpen: boolean,
  overlayTab: string,
  setOverlayTab: Dispatch<SetStateAction<string>>,
  // currentPlaylist: PlaylistType[],
  popupActive: boolean,
  setPopupActive: Dispatch<SetStateAction<boolean>>,
  menuOpen: boolean,
  setMenuOpen: Dispatch<SetStateAction<boolean>>,
  getStartedPlaylists: any[],
  fetchGetStartedPlaylists: () => void,
  topArtists: any[],
  fetchTopArtists: () => void,
  topGenres: any[],
  getTopGenres: () => void,
  test: null,
  searchQuery: string,
  setSearchQuery: Dispatch<SetStateAction<string>>,
  recentlyPlayedSongs: any[],
  fetchRecentlyPlayedSongs: () => void
}




const SpotifyContext = createContext({} as ContextProps)

// CREATES A CONTEXT PROVIDER WITH ALL THE SPOTIFY FUNCTIONS (THE CHILDREN)
export default function SpotifyContextProvider ({children, test}: any)  {
  // THESE ARE THE VALUES PASSING INTO CONTEXT
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
  const [searchResults, setSearchResults] = useState<SearchResults[]>([])
  const [spinner, setSpinner] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {data: session} = useSession()
  const [query, setQuery] = useState("");
  const [overlayTab, setOverlayTab] = useState("playlists")
  const [popupActive, setPopupActive] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType>()
  const [menuOpen, setMenuOpen] = useState(false)
  const [getStartedPlaylists, setGetStartedPlaylists] = useState<any[]>([])
  const [topArtists, setTopArtists] = useState([])
  const [topGenres, setTopGenres] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState<any[]>([])
  const fetchGetStartedPlaylists = async() => {
    // const playlistsIds = ["43Nvl9B8fErDqqPSx1OdW0", "0xVhalpT6uPz4z7x8q11X5", "37i9dQZF1EIefLxrHQP8p4", "37i9dQZF1DXd9rSDyQguIk", "37i9dQZF1DZ06evO0QpvRZ", "23SAT4gA6YG4rif1aWGO1q", "4oCpIPPOlpzT8sUEgErt3O", "37i9dQZF1EQp62d3Dl7ECY" ];
    // // const playlistsIds = ["4s6bQ5K4OC4abHOnS4yNVT", "0xVhalpT6uPz4z7x8q11X5", "37i9dQZF1EIefLxrHQP8p4", "37i9dQZF1DXd9rSDyQguIk", "37i9dQZF1DZ06evO0QpvRZ", "23SAT4gA6YG4rif1aWGO1q", "4oCpIPPOlpzT8sUEgErt3O", "37i9dQZF1EQp62d3Dl7ECY" ];
    // try {
    //   const responses = await Promise.all(playlistsIds.map(playlistId =>
    //     customGet(
    //       `https://api.spotify.com/v1/playlists/${playlistId}?fields=description%2C+name%2C+id%2C+owner%2C+images`,
    //       session
    //     )
    //   ));
    //   setGetStartedPlaylists(responses);
    // } catch (error) {
    //   console.log(error);
    // }
    const response = await fetch('/api/GetStartedPlaylists')
    const data = await response.json();
    console.log(data);
    setGetStartedPlaylists(data)
  }
  function setSpinnerState(value: any) {
    setSpinner(value)
  }
  const fetchPlaylists = async() => {
    // console.log(session.user.accessToken)
    if (session) {
      console.log('FETCHING PLAYLISTS')
      const response = await fetch("/api/playlists");
      const data = await response.json();
      const playlists = data.playlists;
      setPlaylists(playlists);
      console.log(data.playlists)
      setSpinner(false)
    }
    console.log(playlists)
  }
  const fetchSearchResults = async() => {
    try {
      const resp = await axios.get("/api/search")
      const data = resp.data
      setSearchResults(data.items)
    } catch (err) { 
      console.log(err)
    }
  }
  const fetchTopArtists = async() => {
    try {
      const resp = await axios.get("/api/topartists")
      const data = resp.data
      console.log(resp.data)
      setTopArtists(data.topArtists)
    } catch (err) { 
      console.log(err)
    }
  }
  const fetchRecentlyPlayedSongs = async() => {
    const resp = await customGet("https://api.spotify.com/v1/me/player/recently-played", session)
    setRecentlyPlayedSongs(resp.items)
    console.log(resp)
  }
  const getTopGenres = async() => {
    console.log(topArtists)
    // const genresOfTopArtsts = [];
    // // GET GENRES OF TOP ARTISTS
    // for(let index = 0; index < topArtists.length; index++) {
    //   console.log(topArtists[index])
    //   for(let secIndex = 0; secIndex < topArtists[index].genres.length; secIndex++) {
    //     console.log(topArtists[index].genres[secIndex])
    //     genresOfTopArtsts.push(topArtists[index].genres[secIndex])
    //   }
    // }
    // const countOccurrences = (arr) =>
    // arr.reduce((acc, curr) => {
    //   if (!acc[curr]) {
    //     acc[curr] = 1;
    //   } else {
    //     acc[curr] += 1;
    //   }
    //   return acc;
    // }, {});
    // const occurrences = countOccurrences(genresOfTopArtsts);
    // console.log(occurrences)
    // console.log(genresOfTopArtsts)
    // const top100 = Object.keys(occurrences)
    // .sort((a, b) => occurrences[b] - occurrences[a])
    // .slice(0, 100);
    // console.log(top100)
    // setTopGenres(top100)
  }


  return (
    <SpotifyContext.Provider 
      value={{
        playlists, 
        fetchPlaylists,
        searchQuery,
        setSearchQuery,
        searchResults,
        fetchSearchResults,
        spinner,
        setSpinnerState,
        query,
        setQuery,
        mobileMenuOpen,
        overlayTab,
        setOverlayTab,
        popupActive,
        setPopupActive,
        menuOpen,
        setMenuOpen,
        getStartedPlaylists,
        fetchGetStartedPlaylists,
        topArtists,
        fetchTopArtists,
        topGenres, 
        getTopGenres,
        test,
        recentlyPlayedSongs,
        fetchRecentlyPlayedSongs
      }}>
      {children}
    </SpotifyContext.Provider>
  )
}




export const useSpotify = () => useContext(SpotifyContext);

