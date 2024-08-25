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
2. Change themes.
3. Change layout of sections.
4. Change background, color scheme and other UI parts of your web page.

#### Socials List
1. ~~YouTube~~
2. ~~Instagram~~
3. Snapchat
4. Facebook
5. ~~Twitter~~
6. ~~GitHub~~
7. WhatsApp
8. Dribble
9. Linkedin
10. Reddit
11. Behance
12. ~~Spotify~~

## High Priority
```Puppeteer isn't fucking working on vercel. FIX THAT. (Might move to playwright idk.)```

#### Currently working:
```Spotify integration.```

#### To be tested
1. Writing a web scrapper to fetch instagram data via username.

#### Todo:
2. Login page.
3. Social links compatibility.
4. Create indivisual social media cards for better code.
5. Mobile view.

#### Notes:
1. Take screenshots of links that don't qualify in any social types.

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