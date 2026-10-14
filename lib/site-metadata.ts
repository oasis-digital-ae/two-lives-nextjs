import type { Metadata, Viewport } from "next";

/** Shared by every root layout (route groups each render their own <html>). */
export const siteMetadata: Metadata = {
  metadataBase: new URL("https://twolivestheory.com"),
  authors: [{ name: "Basim Yafai" }],
  icons: {
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: [
      { url: "/images/favicon.svg" },
      { url: "/images/favicon.svg", sizes: "72x72" },
      { url: "/images/favicon.svg", sizes: "114x114" },
    ],
  },
};

export const siteViewport: Viewport = {
  themeColor: "#00E184",
};
