import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/shared/Navbar";
import ScrollTopButton from "@/components/shared/ScrollTopButton";

export const metadata: Metadata = {
  title: "Emre Gülşen",
  description: "Emre Gulsen CV Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body id="#top" className="min-h-dvh bg-background text-foreground">
        <Providers>
          <Navbar />
          <ScrollTopButton />

          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
