// import { useEffect } from "react";
// import { signIn, useSession } from 'next-auth/react';
// function useSpotifyHook() {
//     const { data: session, status } = useSession();
    
//     console.log(session)
//     useEffect(() => {
//         if (session) {
//             if(session.error = "RefreshAccessTokenError") {
//                 signIn();
//             }
//         }
//     }, [session])

//     return null
// }

// export default useSpotifyHook