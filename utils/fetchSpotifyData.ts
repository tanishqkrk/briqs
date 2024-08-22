export default async function fetchSpotifyData(url: string) {
  const spotify = "https://open.spotify.com/";
  const [type, id] = url.split("").splice(spotify.length).join("").split("/");

  const clientId = "5dd47e7ea6b24b1fb82a2f5c4b3e710f";
  const clientSecret = "62991999d10b458481dfeea9fdb3923f";

  const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;
  };

  try {
    const token = await getToken();
    const res = await fetch("https://api.spotify.com/v1/" + type + "s/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}
