import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { customGet } from "../../utils/customGet";




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).send("Unauthorized");
      return;
    }
  
    const accessToken = session.user.accessToken;
  
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0',
     {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const data = await response.json();
    const topArtists = data.items;
    console.log(topArtists)

    res.status(200).json({ topArtists });
  }
  
  