import { MySession } from "../types/types";



export const customGet = async (url: string, session: any) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json());
  // console.log(res);
  return res;
};
