export function returnStyles(site: string) {
  switch (site) {
    case "youtube":
      return {
        main: "#CD201F",
        background: "#ffd3d3",
        icon: "/icons/youtube.svg",
        text: "black",
      };
    case "instagram":
      return {
        main: "#E4405F",
        background: "#ffced7",
        icon: "/icons/instagram.svg",
        text: "black",
      };
    case "snapchat":
      return {
        main: "#FFFC00",
        background: "#ffffde",
        icon: "/icons/snapchat.svg",
        text: "black",
      };
    case "facebook":
      return {
        main: "#1877F2",
        background: "#d3e5ff",
        icon: "/icons/facebook.svg",
        text: "black",
      };

    case "twitter":
      return {
        main: "#000000",
        background: "#00000070",
        icon: "/icons/twitter.svg",
        text: "white",
      };
    case "github":
      return {
        main: "#000000",
        background: "#c1c1c1",
        icon: "/icons/github.svg",
        text: "black",
      };
    case "whatsapp":
      return {
        main: "#25D366",
        background: "#c4ffda",
        icon: "/icons/whatsapp.svg",
        text: "black",
      };
    case "dribble":
      return {
        main: "#EA4C89",
        background: "#ffc8dd",
        icon: "/icons/dribble.svg",
        text: "black",
      };
    case "linkedin":
      return {
        main: "#0A66C2",
        background: "#cbe4fe",
        icon: "/icons/linkedin.svg",
        text: "black",
      };
    case "reddit":
      return {
        main: "#FF5700",
        background: "#ffcbb0",
        icon: "/icons/reddit.svg",
        text: "black",
      };
    case "behance":
      return {
        main: "#fff",
        background: "#cbeefe",
        icon: "/icons/behance.svg",
        text: "black",
      };
    case "spotify":
      return {
        main: "#1db954",
        background: "#c6f7d8",
        icon: "/icons/spotify.svg",
        text: "black",
      };
    case "":
      return {
        main: "#000000",
        background: "#fff",
        icon: "",
        text: "black",
      };
  }
}
