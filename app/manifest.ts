import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WE CARE ÉNERGIE — Courtier en énergie",
    short_name: "WE CARE ÉNERGIE",
    start_url: "/",
    display: "browser",
    background_color: "#FFFFFF",
    theme_color: "#0C2C47",
    lang: "fr",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
