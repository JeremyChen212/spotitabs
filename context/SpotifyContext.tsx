import  { Children, createContext, useState, useContext } from 'react'
import axios from 'axios'
import { PlaylistType, SearchResults } from '../types/types'
import { Dispatch, SetStateAction, useMemo } from "react"
import { getUsersPlaylists } from '@component/lib/spotify'
import {useSession} from 'next-auth/react'
import { useEffect } from 'react'
import { customGet } from '@component/utils/customGet'



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
  setPopupActive: Dispatch<SetStateAction<boolean>>,
  menuOpen: boolean,
  setMenuOpen: Dispatch<SetStateAction<boolean>>,
  getStartedPlaylists: any[],
  fetchGetStartedPlaylists: () => void,
  topArtists: [],
  fetchTopArtists: () => void,
  topGenres: [],
  getTopGenres: () => void,
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [getStartedPlaylists, setGetStartedPlaylists] = useState<any[]>([])
  const [topArtists, setTopArtists] = useState([])
  const [topGenres, setTopGenres] = useState([])
  useEffect(() => {
    const playlistsIds = ["4s6bQ5K4OC4abHOnS4yNVT", "0xVhalpT6uPz4z7x8q11X5", "37i9dQZF1EIefLxrHQP8p4", "37i9dQZF1DXd9rSDyQguIk", "2CtbFy5I7LxvXk3pqk77AO", "23SAT4gA6YG4rif1aWGO1q", "4oCpIPPOlpzT8sUEgErt3O", "37i9dQZF1EQp62d3Dl7ECY" ];
  
    const fetchGetStartedPlaylists = async () => {
      try {
        const responses = await Promise.all(playlistsIds.map(playlistId =>
          axios({
            method: 'get',
            url: `https://api.spotify.com/v1/playlists/${playlistId}`,
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            }
          }).then(response => response.data)
        ));
        setGetStartedPlaylists(responses);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (session && typeof window !== 'undefined') {
      fetchGetStartedPlaylists();
    }
  
  }, [session]);

  function setSpinnerState(value) {
    setSpinner(value)
  }
  const fetchPlaylists = async() => {
    console.log(session.accessToken)
    if (session) {
      const response = await fetch("/api/playlists");
      const data = await response.json();
      const playlists = data.playlists;
      setPlaylists(playlists);
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
    const countOccurrences = (arr) =>
    arr.reduce((acc, curr) => {
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

  const fetchGetStartedPlaylists = async() => {
    const playlistsIds = ["4s6bQ5K4OC4abHOnS4yNVT", "2CtbFy5I7LxvXk3pqk77AO", "40OhlsVD7XNnIhkeWgztha", "1YiL6Vk1GWWbltklCI3rak", "37i9dQZF1EQmPV0vrce2QZ"]
    try {
      for (const playlistId of playlistsIds) {
        axios({
          method: 'get',
          url: `https://api.spotify.com/v1/playlists/${playlistId}`,
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          params: {
            limit: 1,
          },
        })
          .then((response) => {
            console.log(response.data)
             setGetStartedPlaylists((prevArray) => [...prevArray, response]);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    } catch(err) {
      console.log(err)
    }
    console.log(getStartedPlaylists)    
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
