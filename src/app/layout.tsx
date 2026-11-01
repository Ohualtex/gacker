import type { Metadata } from "next";
import { Gloock, Hanken_Grotesk } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

const themeScript = `(function(){try{var t=localStorage.getItem('gk-theme')||'light';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-theme="light" suppressHydrationWarning className={`${gloock.variable} ${hanken.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
