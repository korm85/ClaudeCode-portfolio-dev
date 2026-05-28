import type { Metadata } from "next";
import { Space_Grotesk, Roboto_Flex, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Michael Korenevsky | Senior Product Manager",
  description:
    "Senior Product Manager building enterprise AI and predictive tools for high-stakes industries.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${robotoFlex.variable} ${jetBrainsMono.variable} h-full`}
    >
      <body className="min-h-full bg-canvas text-text-primary">
        {children}
      </body>
    </html>
  );
}
