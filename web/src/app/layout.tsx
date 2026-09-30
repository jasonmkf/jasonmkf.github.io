import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KF Production - Android App Development",
  description: "There are countless reasons life gets complicated — but with our app, convenience is just one tap away.",
  icons: {
    icon: '/favicon.ico',
  },
  // Search Console: keep it, Google Auth Platform verified the domain with it.
  verification: {
    google: 'p_lGBh0VMar4oj6RKyaub2TjAgUl49y4Q6eluBXL5-k',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-50`}
      >
        {children}
      </body>
    </html>
  );
}
