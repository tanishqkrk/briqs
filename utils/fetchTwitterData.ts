export async function fetchTwitterData(url: string) {
  let username = "";
  const https = "https://twitter.com/";
  const www = "https://www.twitter.com/";
  const Xhttps = "https://x.com/";
  const Xwww = "https://www.x.com/";
  const check = [https, www, Xhttps, Xwww];
  check.forEach((a) => {
    if (url.includes(a)) {
      const sample = url.split("").splice(a.length);
      if (sample[sample.length - 1] === "/") {
        sample.pop();
      }
      username = sample.join("");
    }
  });
  let response: any = {};

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
      "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}&rest_id=44196397`,
      options
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
