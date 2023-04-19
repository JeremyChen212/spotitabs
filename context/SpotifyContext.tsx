import  { Children, createContext, useState, useContext } from 'react'
import axios from 'axios'
import { PlaylistType, SearchResults } from '../types/types'
import { Dispatch, SetStateAction, useMemo } from "react"
import { getUsersPlaylists } from '@component/lib/spotify'
import {useSession} from 'next-auth/react'

// These are the props that context will take in
interface ContextProps {
  accessToken: string,
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
  setPopupActive: Dispatch<SetStateAction<boolean>>
}


const SpotifyContext = createContext({} as ContextProps)

// CREATES A CONTEXT PROVIDER WITH ALL THE SPOTIFY FUNCTIONS (THE CHILDREN)
export const SpotifyContextProvider = ({children}: any) => {
  // THESE ARE THE VALUES PASSING INTO CONTEXT
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
  const [searchResults, setSearchResults] = useState<SearchResults[]>([])
  const [spinner, setSpinner] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {data: session} = useSession()
  const [query, setQuery] = useState("");
  const [overlayTab, setOverlayTab] = useState("playlists")
  const [popupActive, setPopupActive] = useState(false)
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType>([])
  function setSpinnerState(value) {
    setSpinner(value)
  }
  const fetchPlaylists = async() => {
    console.log(session.accessToken)
    try {
    const resp = await axios("/api/playlists");
    const data = await resp.data;
      setPlaylists(data.items)
      setSpinner(false)
      console.log("fetching playlists")
    } catch (err) {
      console.error(err)
    }
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
        setPopupActive
      }}>
      {children}
    </SpotifyContext.Provider>
  )
}


export const useSpotify = () => useContext(SpotifyContext);
