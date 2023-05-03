import useSWR from 'swr';
import { getSession } from 'next-auth/react';

const fetcher = (...args) => fetch(...args).then(res => res.json())



export default function usePlaylists () {
    const session = getSession()
    const { data, error, isLoading } = useSWR(`/api/playlists/`, fetcher)
    console.log(data)
    return {
      user: data,
      isLoading,
      isError: error
    }
  }