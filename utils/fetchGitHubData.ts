export default async function fetchGitHubData(url: string) {
  let username = "";
  const https = "https://github.com/";
  const www = "https://www.github.com/";
  let repo = "";

  let response: any = {};

  if (url.includes(https)) {
    const slug = url.split("").splice(19).join("").split("");
    if (
      slug[slug.length - 1] === "/" &&
      slug.filter((x) => x === "/").length === 1
    ) {
      const sample = url.split("").splice(19);
      const hehe = sample.pop();
      username = sample.join("");
    } else if (!(slug[slug.length - 1] === "/") && slug.includes("/")) {
      const slashPos = slug.indexOf("/");
      const removed = slug.splice(slashPos, slug.length - slashPos, "/repos");
      username = slug.join("");
      removed.shift();
      repo = removed.join("");
    } else {
      let sample = url.split("").splice(19);
      if (sample[sample.length - 1] === "/") {
        sample.pop();
        const slashPos = sample.indexOf("/");
        const removed = sample.splice(slashPos);
        removed.shift();
        // console.log(sample, removed);
        sample = [...sample, "/repos"];
        repo = removed.join("");
      }
      username = sample.join("");
    }
  } else if (url.includes(www)) {
    const slug = url.split("").splice(23).join("").split("");
    if (
      slug[slug.length - 1] === "/" &&
      slug.filter((x) => x === "/").length === 1
    ) {
      const sample = url.split("").splice(23);
      const hehe = sample.pop();
      username = sample.join("");
    } else if (!(slug[slug.length - 1] === "/") && slug.includes("/")) {
      const slashPos = slug.indexOf("/");
      const removed = slug.splice(slashPos, slug.length - slashPos, "/repos");
      username = slug.join("");
      removed.shift();
      repo = removed.join("");
    } else {
      let sample = url.split("").splice(23);
      if (sample[sample.length - 1] === "/") {
        sample.pop();
        const slashPos = sample.indexOf("/");
        const removed = sample.splice(slashPos);
        removed.shift();
        // console.log(sample, removed);
        sample = [...sample, "/repos"];
        repo = removed.join("");
      }
      username = sample.join("");
    }
  }

  // console.log(username);

  try {
    if (repo) {
      const data = await fetch("https://api.github.com/users/" + username);
      const json = await data.json();
      const repository = json.filter((r: any) => r.name === repo);
      response = repository[0];
    } else {
      const data = await fetch("https://api.github.com/users/" + username);
      const json = await data.json();
      response = json;
    }
    return response;
  } catch (err) {}
}
