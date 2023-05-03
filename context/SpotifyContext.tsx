import { createContext, useState, useContext } from 'react'
import axios from 'axios'
import { PlaylistType, SearchResults } from '../types/types'
import { Dispatch, SetStateAction } from "react"
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

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
  currentPlaylist: PlaylistType[],
  popupActive: boolean,
  setPopupActive: Dispatch<SetStateAction<boolean>>,
  menuOpen: boolean,
  setMenuOpen: Dispatch<SetStateAction<boolean>>,
  getStartedPlaylists: any[],
  setGetStartedPlaylists: Dispatch<SetStateAction<any>>,
  topArtists: any[],
  fetchTopArtists: () => void,
  topGenres: any[],
  getTopGenres: () => void
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
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType[]>([])
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [getStartedPlaylists, setGetStartedPlaylists] = useState([])
  const [topArtists, setTopArtists] = useState<any>([])
  const [topGenres, setTopGenres] = useState<any>([])
  

  function setSpinnerState(value: any) {
    setSpinner(value)
  }
  const fetchPlaylists = async() => {
    // console.log(session.user.accessToken)
    if (session) {
      const response = await fetch("/api/playlists");
      const data = await response.json();
      setPlaylists(data.items);
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
      console.log(topArtists)
      setTopArtists(data.topArtists)
    } catch (err) { 
      console.log(err)
    }
  }
  const getTopGenres = async() => {
    console.log(topArtists)
    const genresOfTopArtsts = [];
    // GET GENRES OF TOP ARTISTS
    for(let index = 0; index < topArtists.length; index++) {
      console.log(topArtists[index])
      for(let secIndex = 0; secIndex < topArtists[index].genres.length; secIndex++) {
        console.log(topArtists[index].genres[secIndex])
        genresOfTopArtsts.push(topArtists[index].genres[secIndex])
      }
    }
    const countOccurrences = (arr: any) =>
    arr.reduce(({acc, curr}: any) => {
      if (!acc[curr]) {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, {});
    const occurrences = countOccurrences(genresOfTopArtsts);
    console.log(occurrences)
    console.log(genresOfTopArtsts)
    const top100 = Object.keys(occurrences)
    .sort((a, b) => occurrences[b] - occurrences[a])
    .slice(0, 100);
    console.log(top100)
    setTopGenres(top100)
  }


  return (
    <SpotifyContext.Provider 
      value={{
        playlists, 
        fetchPlaylists,
        searchResults,
        fetchSearchResults,
        spinner,
        setSpinnerState,
        query,
        setQuery,
        mobileMenuOpen,
        overlayTab,
        setOverlayTab,
        currentPlaylist,
        popupActive,
        setPopupActive,
        menuOpen,
        setMenuOpen,
        getStartedPlaylists,
        setGetStartedPlaylists,
        topArtists,
        fetchTopArtists,
        topGenres, 
        getTopGenres
      }}>
      {children}
    </SpotifyContext.Provider>
  )
}




export const useSpotify = () => useContext(SpotifyContext);

