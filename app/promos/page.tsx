"use client";

import { useEffect, useMemo, useState } from "react";
import { Gift, Percent, Sparkles, ShoppingBag } from "lucide-react";

export default function PromosPage() {
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cartTotal, setCartTotal] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("birriaCart");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Array<{
        quantity: number;
        price: number;
      }>;
      const total = parsed.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );
      setCartTotal(total);
    } catch {
      setCartTotal(null);
    }
  }, []);

  const total = cartTotal ?? 520;
  const discounted = total * (1 - discount);

  const handleApply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === "BIRRIA10") {
      setDiscount(0.1);
      setMessage(
        "¡Cupón aplicado! Obtienes 10% de descuento sobre tu carrito.",
      );
    } else {
      setDiscount(0);
      setMessage(
        "Cupón no reconocido. Usa BIRRIA10 para un descuento especial.",
      );
    }
  };

  const combos = [
    {
      title: "Combo Bros",
      description: "3 Tacos de Birria + Consomé + Bebida",
      price: 5,
    },
    {
      title: "Mega Quesabirria",
      description: "2 Quesabirrias + Guacamole + Refresco",
      price: 7,
    },
    {
      title: "Parrillero",
      description: "4 Tacos mixtos + 2 bebidas + Totopos",
      price: 10,
    },
  ];

  return (
    <div className="pt-28 pb-24">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.7fr]">
          <div className="rounded-[2rem] border border-zinc-800/90 bg-zinc-950/80 p-8 shadow-2xl shadow-red-950/20">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-red-300">
                <Sparkles className="h-4 w-4" /> Promociones Temporales
              </span>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Combos del mes para pedir y compartir
              </h1>
              <p className="mt-4 max-w-2xl text-zinc-400">
                Descubre nuestras promociones creadas para que tu experiencia
                sea sabrosa, rápida y con un toque de Birria Bros.
              </p>
            </div>

            <div className="grid gap-4">
              {combos.map((combo) => (
                <article
                  key={combo.title}
                  className="rounded-[1.75rem] border border-zinc-800/70 bg-black/60 p-6 transition hover:border-amber-400/40"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {combo.title}
                      </h2>
                      <p className="mt-2 text-sm text-zinc-400">
                        {combo.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-400/15 px-4 py-2 text-sm font-semibold text-amber-200">
                      ${combo.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-zinc-800/90 bg-zinc-950/80 p-8 shadow-2xl shadow-red-950/20">
              <div className="flex items-center gap-3 text-amber-300">
                <Gift className="h-5 w-5" />
                <p className="text-sm uppercase tracking-[0.26em] text-amber-300">
                  Cupón de descuento
                </p>
              </div>
              <p className="mt-4 text-zinc-400">
                Ingresa tu código para aplicar el descuento a tu total simulado
                del carrito.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleApply}>
                <input
                  className="w-full rounded-3xl border border-zinc-800/70 bg-zinc-900/90 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
                  placeholder="BIRRIA10"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button className="w-full rounded-full bg-gradient-to-r from-amber-400 via-red-600 to-amber-400 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:opacity-95">
                  Aplicar cupón
                </button>
              </form>
              {message ? (
                <p className="mt-3 text-sm text-zinc-300">{message}</p>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-zinc-800/90 bg-black/70 p-6">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.18em] text-zinc-500">
                <span>Total estimado</span>
                <span className="font-semibold text-white">
                  ${total.toFixed(0)}
                </span>
              </div>
              <div className="mt-4 rounded-3xl bg-zinc-900/80 p-5">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <ShoppingBag className="h-4 w-4 text-amber-300" />
                  <span>Carrito simulado según tus órdenes actuales.</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-semibold text-white">
                  <span>Total con descuento</span>
                  <span>${discounted.toFixed(0)}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  Si no hay carrito, este total muestra un pedido de referencia.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
