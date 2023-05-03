import { Divider } from "@chakra-ui/react";
import { useEffect } from "react";
import { signIn, useSession } from 'next-auth/react';
import spotifyApi from "@component/lib/spotify";
function useSpotifyHook() {
    const { data: session, status } = useSession();
    
    console.log(session)
    useEffect(() => {
        if (session) {
            if(session.error = "RefreshAccessTokenError") {
                signIn();
            }
        }
    }, [session])

    return null
}

export default useSpotifyHook