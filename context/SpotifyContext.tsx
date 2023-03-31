import  { Children, createContext, useState, useContext } from 'react'
import axios from 'axios'
import { PlaylistType, SearchResults } from '../types/types'
import { useMemo } from "react"

// These are the props that context will take in
interface ContextProps {
  playlists: PlaylistType[],
  fetchPlaylists: () => void
  searchResults : SearchResults[],
  fetchSearchResults: () => void,
  spinner: boolean,
  setSpinnerState: any
}


const SpotifyContext = createContext({} as ContextProps)

// CREATES A CONTEXT PROVIDER WITH ALL THE SPOTIFY FUNCTIONS (THE CHILDREN)
export const SpotifyContextProvider = ({children}: any) => {
  // THESE ARE THE VALUES PASSING INTO CONTEXT
  const [playlists, setPlaylists] = useState<PlaylistType[]>([])
  const [searchResults, setSearchResults] = useState<SearchResults[]>([])
  const [spinner, setSpinner] = useState(true)
  function setSpinnerState(value) {
    setSpinner(value)
  }
  const fetchPlaylists = async() => {
    try {
      const resp = await axios.get("/api/playlists")
      const data = resp.data
      setPlaylists(data.items)
      setSpinner(false)
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
        setSpinnerState
      }}>
      {children}
    </SpotifyContext.Provider>
  )
}


export const useSpotify = () => useContext(SpotifyContext);
