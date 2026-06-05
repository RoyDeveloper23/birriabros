"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingCart, Sparkles, MapPin, Phone } from "lucide-react";
import { useCart } from "../cart-context";

const navLinks = [
  { label: "Menú", href: "/" },
  { label: "Reservas", href: "/reservas" },
  { label: "Promos", href: "/promos" },
];

export default function NavBar() {
  const { cartCount } = useCart();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-gradient-to-r from-red-700 via-orange-600 to-amber-400 text-white backdrop-blur-sm">
      <div className="papel-picado" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold uppercase tracking-[0.2em] text-amber-300"
        >
          <Sparkles className="h-6 w-6 text-red-50" />
          Birria Bros
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-[0.18em] text-white/90 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {/* <Link
            href="/admin"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/20"
          >
            Admin
          </Link> */}
          <Link
            href="/carrito"
            className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <ShoppingCart className="h-4 w-4 text-white" />
            {cartCount} artículos
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20 md:hidden"
          onClick={() => setOpenMenu((current) => !current)}
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {openMenu ? (
        <div className="border-t border-zinc-900/50 bg-black/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-2xl bg-zinc-950/80 px-4 py-3 text-sm uppercase tracking-[0.18em] text-zinc-200 transition hover:bg-zinc-800"
                onClick={() => setOpenMenu(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/carrito"
              className="block rounded-2xl bg-amber-500/10 px-4 py-3 text-sm uppercase tracking-[0.18em] text-amber-200 transition hover:bg-amber-500/15"
              onClick={() => setOpenMenu(false)}
            >
              Carrito ({cartCount})
            </Link>
            {/* <Link
              href="/admin"
              className="block rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm uppercase tracking-[0.18em] text-amber-200 transition hover:bg-amber-500/15"
              onClick={() => setOpenMenu(false)}
            >
              Admin
            </Link> */}
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-zinc-900/60 pt-4 text-xs uppercase tracking-[0.2em] text-zinc-400">
            <MapPin className="h-4 w-4 text-amber-400" />
            Urdesa Norte · GYE
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
            <Phone className="h-4 w-4 text-red-500" />
            +593 98 765 4321
          </div>
        </div>
      ) : null}
    </header>
  );
}
