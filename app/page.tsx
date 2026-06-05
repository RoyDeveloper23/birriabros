"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Clock3, Gift, ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";

type MenuItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  image: string;
};

const menuItems: MenuItem[] = [
  {
    id: "taco-birria",
    category: "Tacos",
    title: "Taco de Birria",
    description: "Taco con carne jugosa, cebolla morada y salsa de chile rojo.",
    price: 6.2,
    tags: ["vendidos", "picantes", "individuales"],
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "taco-suadero",
    category: "Tacos",
    title: "Taco de Suadero",
    description: "Suadero glaseado con limón y cilantro fresco.",
    price: 5.8,
    tags: ["vendidos", "individuales"],
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "birria-plato",
    category: "Birrias",
    title: "Birria de Res",
    description:
      "Plato tradicional con consomé de chile ancho y tortillas al vapor.",
    price: 8.5,
    tags: ["vendidos"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "birria-half",
    category: "Birrias",
    title: "Medio Kilo Birria",
    description: "Perfecto para compartir: carne suave y pura salsa de adobo.",
    price: 11.3,
    tags: ["picantes"],
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "quesabirria-oreada",
    category: "Quesabirrias",
    title: "Quesabirria Dorada",
    description: "Queso derretido con salsa de birria y consomé a un lado.",
    price: 3.5,
    tags: ["vendidos", "individuales"],
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "quesabirria-suprema",
    category: "Quesabirrias",
    title: "Quesabirria Suprema",
    description: "Doble carne, queso Oaxaca y frijoles rancheros.",
    price: 5.8,
    tags: ["picantes"],
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "agua-jamaica",
    category: "Bebidas",
    title: "Agua de Jamaica",
    description: "Refrescante y ligeramente dulce con toque cítrico.",
    price: 2.8,
    tags: ["individuales"],
    image:
      "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "refresco-artesanal",
    category: "Bebidas",
    title: "Refresco Artesanal",
    description: "Sabor a tamarindo o cola para acompañar tu pedido.",
    price: 2.2,
    tags: ["individuales"],
    image:
      "https://images.unsplash.com/photo-1505253212571-0a5edc2a7f7f?auto=format&fit=crop&w=1000&q=80",
  },
];

const categories = ["Tacos", "Birrias", "Quesabirrias", "Bebidas"];
const quickFilters = [
  { label: "Los Más Vendidos", value: "vendidos" },
  { label: "Picantes", value: "picantes" },
  { label: "Individuales", value: "individuales" },
];

function formatCurrency(price: number) {
  return `$${price.toFixed(0)}`;
}

export default function Home() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState("Tacos");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const now = new Date();
  const currentHour = now.getHours();
  const isOpen = currentHour >= 13 && currentHour < 21;

  const filteredItems = useMemo(
    () =>
      menuItems.filter((item) => {
        const matchesCategory = item.category === category;
        const matchesFilter = activeFilter
          ? item.tags.includes(activeFilter)
          : true;
        return matchesCategory && matchesFilter;
      }),
    [category, activeFilter],
  );

  return (
    <div className="pt-28 pb-24">
      {isOpen ? (
        <div className="fixed inset-x-0 top-[4.5rem] z-40 border-b border-red-700/40 bg-red-950/90 px-4 py-3 text-center text-sm text-amber-100 backdrop-blur-sm sm:px-6">
          Cocina cerrada por ahora. Puedes programar tu pedido o reserva.
        </div>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-zinc-800/90 bg-zinc-950/80 p-8 shadow-2xl shadow-red-950/20">
          <div className="mb-10 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-amber-300">
              <Clock3 className="h-4 w-4" /> Horario: 12:00 - 23:00
            </span>
            <div className="space-y-4 sm:flex sm:items-end sm:justify-between sm:gap-6 sm:space-y-0">
              <div className="max-w-3xl space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Birria Bros: el sabor intenso de la calle en tu mesa
                </h1>
                <p className="text-zinc-400">
                  Descubre nuestro menú digital interactivo, elige tus platillos
                  favoritos y ve directo al carrito para completar tu pedido.
                </p>
              </div>
              <Link
                href="/carrito"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:opacity-95"
              >
                Ir al carrito
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_0.45fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {categories.map((option) => (
                <button
                  key={option}
                  onClick={() => setCategory(option)}
                  className={`rounded-3xl px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition ${
                    category === option
                      ? "bg-amber-300 text-slate-950"
                      : "bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-zinc-800/70 bg-black/60 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Filtros rápidos
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    Encuentra lo mejor de cada categoría.
                  </p>
                </div>
                <Gift className="h-5 w-5 text-amber-300" />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {quickFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() =>
                      setActiveFilter(
                        activeFilter === filter.value ? null : filter.value,
                      )
                    }
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      activeFilter === filter.value
                        ? "bg-amber-300 text-black"
                        : "bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-zinc-800/90 bg-zinc-950/80 p-8 shadow-2xl shadow-red-950/20">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-amber-300">
                {category}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Elige tu antojo
              </h2>
            </div>
            <p className="text-sm text-zinc-400">
              {filteredItems.length} platillos disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group birria-card flex flex-col h-full border border-zinc-200/10 shadow-sm transition hover:shadow-md"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover brightness-95 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-between p-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#b91c1c]">
                      <span>{item.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[#f59e0b]" />
                      <span className="text-xs text-zinc-600">
                        {item.tags.includes("vendidos") ? "Top" : "Especial"}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-[#0b0b0b]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-700">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold text-[#b91c1c]">
                      {formatCurrency(item.price)}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="ml-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b91c1c] via-[#f97316] to-[#f59e0b] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
                    >
                      <ShoppingCart className="h-4 w-4" /> Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* <div className="mt-10 rounded-[2rem] border border-orange-400/20 bg-orange-950/60 p-6 text-center shadow-xl shadow-orange-900/20">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-300">Carrito separado</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">Todo el flujo del carrito en una ruta distinta</h3>
            <p className="mt-3 text-sm leading-6 text-orange-100/80">
              Mantén el menú limpio y enfocado. Ve a tu carrito para revisar tu pedido, pagar y finalizar compra.
            </p>
            <Link
              href="/carrito"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
            >
              Ver carrito
            </Link>
          </div> */}
        </div>
      </section>
    </div>
  );
}
