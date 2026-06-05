import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CartProvider from "./cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Birria Bros | Cocina Mexicana",
  description:
    "Birria Bros presenta menú, reservas, promociones y dashboard admin con estilo moderno y mexicano.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#070505] text-white">
        <CartProvider>
          <NavBar />
          <main className="flex min-h-screen flex-col">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
