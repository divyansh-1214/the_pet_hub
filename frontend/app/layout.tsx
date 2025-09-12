import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/navigation";
import { Suspense } from "react";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
export const metadata: Metadata = {
  title: "PetHub - Community Platform for Pet Owners",
  description:
    "Find vets, adopt pets, help strays, and connect with the pet community",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
        </Suspense>
        <main className="min-h-screen">{children}</main>
        <Analytics />
        <Link href="/emergency" className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full h-14 w-14 bg-destructive hover:bg-destructive/90 shadow-lg"
          >
            <Phone className="h-6 w-6" />
          </Button>
        </Link>
      </body>
    </html>
  );
}
