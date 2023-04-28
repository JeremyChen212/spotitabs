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

  const accessToken = session.accessToken;

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  const playlists = data.items;

  res.status(200).json({ playlists });
}

