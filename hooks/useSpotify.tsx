import { Divider } from "@chakra-ui/react";
import { useEffect } from "react";
import { signIn, useSession } from 'next-auth/react';
import spotifyApi from "@component/lib/spotify";
function useSpotify() {
    const { data: session, status } = useSession();\
    console.log(session)
    useEffect(() => {
        if (session) {
            if(session.error = "RefreshAccessTokenError") {
                signIn();
            }
            
            spotifyApi.setAccessToken(session.accessToken)
        }
    }, [session])

    return null
}

export default useSpotify