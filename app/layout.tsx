import type { Metadata } from "next";
import {
  Architects_Daughter,
  Work_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Link from "next/link.js";

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
  title: "Frontend from First Principles",
  description:
    "A deep-dive into how browsers actually work — from parsing HTML to compositing pixels.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${architectsDaughter.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-ink-900 text-chalk font-body antialiased">
        <header className="border-b border-blueprint-line px-6 py-4">
          <Link href="/" className="font-display text-2xl text-signal-orange">
            Frontend, First Principles
          </Link>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-blueprint-line px-6 py-4 text-sm text-blueprint-line font-mono">
          Built one render cycle at a time.
        </footer>
      </body>
    </html>
  );
}
