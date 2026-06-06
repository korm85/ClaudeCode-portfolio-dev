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
    "Senior PM at Oqton. Enterprise AI, computer vision, predictive simulation. 10+ years in regulated industries. Baker Hughes, Thales, Elos Medtech.",
  openGraph: {
    title: "Michael Korenevsky | Senior Product Manager",
    description:
      "Enterprise AI and simulation products for regulated industries.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Michael Korenevsky | Senior Product Manager",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Michael Korenevsky",
  jobTitle: "Senior Product Manager",
  worksFor: {
    "@type": "Organization",
    name: "Oqton",
  },
  url: "https://michael-korenevsky.vercel.app",
  sameAs: ["https://www.linkedin.com/in/michael-korenevsky/"],
  knowsAbout: [
    "Product Management",
    "AI Computer Vision",
    "Predictive Simulation",
    "Enterprise Software",
    "B2B SaaS",
    "Regulated Industries",
  ],
  description:
    "Senior Product Manager with 10+ years in enterprise B2B, AI computer vision products, and physics-based simulation tools for regulated industries.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${robotoFlex.variable} ${jetBrainsMono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-canvas text-text-primary">
        {children}
      </body>
    </html>
  );
}
