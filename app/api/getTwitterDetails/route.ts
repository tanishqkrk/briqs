import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const endpointURL = "https://api.twitter.com/2/users/by?usernames=";
    const username = "tanishqkrk";
    const token =
      "AAAAAAAAAAAAAAAAAAAAALDxvQEAAAAALRaV5jNFR%2FvrihhxLv91z4nEY2A%3Dx6YyqTwC61XFg3u0GtRZZ5txOAfjSIoqPWCDOaE8vALrkSEk1o";
    const res = await fetch(
      "https://api.twitter.com/2/users/by?usernames=tanishqkrk",
      {
        headers: {
          "User-Agent": "v2UserLookupJS",
          authorization: `Bearer AAAAAAAAAAAAAAAAAAAAALDxvQEAAAAALRaV5jNFR%2FvrihhxLv91z4nEY2A%3Dx6YyqTwC61XFg3u0GtRZZ5txOAfjSIoqPWCDOaE8vALrkSEk1o`,
        },
      }
    );
    return NextResponse.json(await res.json());
  } catch (err) {}
}
