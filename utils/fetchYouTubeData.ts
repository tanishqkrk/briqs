const config = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
  },
};

export async function fetchYouTubeData(url: string) {
  try {
    if (url.includes("youtube.com/channel/")) {
      const channelId = url.split("").splice(32).join("");
      const response = await fetch(
        `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${channelId}`,
        config
      );
      const result = await response.json();
      return {
        ...result.items[0].snippet,
        type: "channel",
        channel: true,
      };
    } else if (url.includes("@")) {
      const channelId = url.split("").splice(25).join("");
      const response = await fetch(
        `https://youtube-v31.p.rapidapi.com/search?q=${channelId}&part=snippet%2Cid&maxResults=100`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
            "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
          },
        }
      );
      const result = await response.json();
      const channelResult = result.items.filter(
        (x: any) => x.id.kind === "youtube#channel"
      );

      const channelOrgId = channelResult[0].snippet.channelId;

      const channelData = await (
        await fetch(
          `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${channelOrgId}`,
          config
        )
      ).json();
      return {
        ...channelResult[0].snippet,
        ...channelData.items[0].statistics,
        type: "channel",
        channel: true,
      };
    } else {
      const response = await fetch(
        `https://youtube-v31.p.rapidapi.com/search?q=${url}&part=snippet%2Cid`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "834f9f0f0dmsh7855af479e4d60bp1d97f4jsne51872208059",
            "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
          },
        }
      );
      const result = await response.json();
      const data = await result.items[0].snippet;
      return {
        ...data,
        type: "video",
      };
    }
    // return result;
  } catch (error) {
    console.error(error);
  }
}
