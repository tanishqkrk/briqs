export default async function fetchInstagramData(url: string) {
  const username = url.split("").splice(26);
  const slash = username.indexOf("/");
  if (username.includes("/")) username.splice(slash);

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
      "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      "https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=" +
        url,
      options
    );
    const result = await (await response.json()).data;

    return result;
  } catch (error) {
    return {
      error: "UGNA",
    };
    console.error(error);
  }
}
