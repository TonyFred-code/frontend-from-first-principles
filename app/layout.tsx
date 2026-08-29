import type { Metadata } from "next";
import {
  Architects_Daughter,
  Work_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Link from "next/link.js";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frontend-from-first-principles.vercel.app"),
  title: {
    default: "Frontend from First Principles",
    template: "%s | Frontend from First Principles",
  },
  description:
    "A deep-dive into how browsers actually work — from parsing HTML to compositing pixels.",
  openGraph: {
    title: "Frontend from First Principles",
    description:
      "A deep-dive into how browsers actually work — from parsing HTML to compositing pixels.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend from First Principles",
    description:
      "A deep-dive into how browsers actually work — from parsing HTML to compositing pixels.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${architectsDaughter.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body antialiased">
        <ThemeProvider>
          <header className="border-b border-line px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-display text-2xl text-signal-orange">
              Frontend, First Principles
            </Link>
            <ThemeToggle />
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-line px-6 py-4 text-sm text-line font-mono">
            Built one render cycle at a time.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
