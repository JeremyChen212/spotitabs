export const customGet = async (url: string, session) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  }).then((res) => res.json());
  // console.log(res);
  return res;
};
