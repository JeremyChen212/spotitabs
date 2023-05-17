import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { customGet } from "../../utils/customGet";


const getPlaylists = async(session: any) => {
    const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50&fields=items(name,images,owner,description)", {
        headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        }
    });

    const data = await response.json();
    const playlists = data.items;

    return playlists
}




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).send("Unauthorized");
      return;
    }
  
    
    const playlists = await getPlaylists(session);
  
    res.status(200).json({ playlists });
  }
