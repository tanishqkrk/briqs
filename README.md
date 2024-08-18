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


## High Priority
```Puppeteer isn't fucking working on vercel. FIX THAT.```

#### Currently working:
```Fix instagram CORS pfp issue.```

#### To be tested
1. Writing a web scrapper to fetch instagram data via username.

#### Todo:
1. Login page.
2. Social links compatibility.

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