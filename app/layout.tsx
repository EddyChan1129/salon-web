import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/wght-italic.css";
import { Footer } from "./components/editorial";
import { Header } from "./components/header";
import { SiteMotion } from "./components/site-motion";
import { salon } from "./salon";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Nagi Hair Atelier", template: "%s | Nagi Hair Atelier" },
  description: salon.description,
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  openGraph: { title: "Nagi Hair Atelier", description: salon.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-to-content" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <SiteMotion />
      </body>
    </html>
  );
}
