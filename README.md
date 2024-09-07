<img width="50%" src="./public/logo_long.png" />

## Create Personalized portfolios
Create a portfolio and get your unique link _(briqs.site/tanishqkrk)_
<!-- ### Core functionlaity -->

### Planned features
1. Add various content categories
   1. Social links
   2. Experience
   3. Headings
   4. Projects
   5. Blogs
   6. Gallery
2. Change themes
3. Change layout of sections.
4. Change background, color scheme and other UI parts of your web page.
5. Search users
6. Add notes.
#### Socials List
```md
[x] YouTube
[?] Instagram
[] Snapchat
[] Facebook
[?] Twitter
[x] GitHub
[] WhatsApp
[] Dribble
[] Linkedin
[] Reddit
[] Behance
[x] Spotify
```

## High Priority
[] Twitter API returing Elon musk?!

#### Currently working:
[] Social links UI

#### Todo:
```md
[x] Writing a web scrapper to fetch instagram data via username.
[x] Login page.
[] *Write web scapper service and host it on a server.*
[] Create indivisual social media cards for better code.
[] Mobile view.
[] Use profile picture as link icon.
[] User search bar
[] Google Auth
[] Auth with usernames
[] Error handelling for non user slugs.
```

### Known issues: 
1. Twitter API returns error work on first time in prod.

#### Notes (Don't bother, it's for the devs):
1. Take screenshots of links that don't qualify in any social types.
2. Save scraped user data in db.

```ts
await page.screenshot({
    path:
      "C:/Users/Taruvar/Downloads/" +
      Math.floor(Math.random() * 100 + 0).toString() +
      ".png",
  });
```
2. Backup instagram data scrapper: 
```js
meta[name="description"]
```
3. https://api.bento.me/v1/urlrichdata/https%3A%2F%2Finstagram.com%2F{username} 🤫