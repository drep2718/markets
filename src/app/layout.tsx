import type { Metadata } from "next";
import { Playfair_Display, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Energy Markets Intelligence",
  description:
    "Real-time energy market news and comprehensive learning resources for oil, gas, and energy markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-6 text-center text-sm text-muted font-body">
          <div className="max-w-7xl mx-auto px-4">
            Energy Markets Intelligence
          </div>
        </footer>
      </body>
    </html>
  );
}
