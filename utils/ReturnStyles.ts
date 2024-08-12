export function returnStyles(site: string) {
  switch (site) {
    case "youtube":
      return {
        main: "#CD201F",
        background: "#ffd3d3",
        icon: "/icons/youtube.svg",
      };
    case "instagram":
      return {
        main: "#E4405F",
        background: "#ffced7",
        icon: "/icons/instagram.svg",
      };
    case "snapchat":
      return {
        main: "#FFFC00",
        background: "#ffffde",
        icon: "/icons/snapchat.svg",
      };
    case "facebook":
      return {
        main: "#1877F2",
        background: "#d3e5ff",
        icon: "/icons/facebook.svg",
      };

    case "twitter":
      return {
        main: "#ffffff10",
        background: "#00000020",
        icon: "",
      };
    case "github":
      return {
        main: "#fff",
        background: "#000",
        icon: "/icons/github.svg",
      };
    case "whatsapp":
      return {
        main: "#25D366",
        background: "#c4ffda",
        icon: "/icons/whatsapp.svg",
      };
    case "dribble":
      return {
        main: "#EA4C89",
        background: "#ffc8dd",
        icon: "/icons/dribble.svg",
      };
    case "linkedin":
      return {
        main: "#0A66C2",
        background: "#cbe4fe",
        icon: "/icons/linkedin.svg",
      };
    case "reddit":
      return {
        main: "#FF5700",
        background: "#ffcbb0",
        icon: "/icons/reddit.svg",
      };
    case "behance":
      return {
        main: "#fff",
        background: "#cbeefe",
        icon: "/icons/behance.svg",
      };
    case "":
      return {
        main: "#d8d8d8",
        background: "#ededed",
        icon: "",
      };
  }
}
