export default async function fetchInstagramData(url: string) {
  const username = url.split("").splice(26).join("");
  const response = await fetch("/api/getInstagramDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      url,
    }),
  });
  return response;
}
