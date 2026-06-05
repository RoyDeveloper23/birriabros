"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Lock,
  PlusCircle,
  RefreshCcw,
  Tag,
  XCircle,
} from "lucide-react";

type InventoryItem = {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  disponible: boolean;
};

type Promo = {
  id: string;
  nombre: string;
  descuento: number;
};

const initialInventory: InventoryItem[] = [
  {
    id: "taco-azteca",
    nombre: "Taco de Birria Clásico",
    categoria: "Tacos",
    precio: 3,
    disponible: true,
  },
  {
    id: "birria-plato",
    nombre: "Birria de Res con Consomé",
    categoria: "Birrias",
    precio: 3.5,
    disponible: true,
  },
  {
    id: "quesabirria",
    nombre: "Quesabirria Dorada",
    categoria: "Quesabirrias",
    precio: 3.5,
    disponible: true,
  },
  {
    id: "refresco",
    nombre: "Refresco Artesanal",
    categoria: "Bebidas",
    precio: 1.5,
    disponible: true,
  },
  {
    id: "taco-picante",
    nombre: "Taco Picante de Suadero",
    categoria: "Tacos",
    precio: 3.5,
    disponible: true,
  },
];

const initialPromos: Promo[] = [
  { id: "promo-1", nombre: "BIRRIA10", descuento: 10 },
  { id: "promo-2", nombre: "COMBOBRO", descuento: 18 },
];

export default function AdminPage() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [promos, setPromos] = useState<Promo[]>(initialPromos);
  const [newPromo, setNewPromo] = useState({ nombre: "", descuento: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.username === "admin" && user.password === "admin123") {
      setLoggedIn(true);
      setError("");
      return;
    }
    setError("Usuario o contraseña incorrectos.");
  };

  const toggleAvailability = (id: string) => {
    setInventory((current) =>
      current.map((item) =>
        item.id === id ? { ...item, disponible: !item.disponible } : item,
      ),
    );
  };

  const updatePrice = (id: string, value: string) => {
    const price = Number(value);
    if (Number.isNaN(price) || price < 0) return;
    setInventory((current) =>
      current.map((item) =>
        item.id === id ? { ...item, precio: price } : item,
      ),
    );
  };

  const handleNewPromo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPromo.nombre || !newPromo.descuento) return;
    const promo = {
      id: `promo-${Date.now()}`,
      nombre: newPromo.nombre.toUpperCase(),
      descuento: Number(newPromo.descuento),
    } as Promo;
    setPromos((current) => [promo, ...current]);
    setNewPromo({ nombre: "", descuento: "" });
    setSuccessMessage("Promoción creada con éxito.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const soldOutCount = inventory.filter((item) => !item.disponible).length;
  const activePromoCount = promos.length;

  const stats = useMemo(
    () => [
      { label: "Platos activos", value: inventory.length - soldOutCount },
      { label: "Platos agotados", value: soldOutCount },
      { label: "Promos activas", value: activePromoCount },
    ],
    [activePromoCount, inventory.length, soldOutCount],
  );

  return (
    <div className="pt-28 pb-24">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-zinc-800/80 bg-zinc-950/80 p-8 shadow-2xl shadow-red-950/20">
          <div className="mb-10 flex flex-col gap-4 text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-amber-300">
              <Lock className="h-4 w-4" /> Dashboard Admin
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Panel Birria Bros
            </h1>
            <p className="max-w-3xl text-zinc-400">
              Gestiona inventario, precios y promociones.
            </p>
          </div>

          {!loggedIn ? (
            <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-zinc-800/80 bg-black/70 p-8">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2 text-sm text-zinc-300">
                  <label>Usuario</label>
                  <input
                    value={user.username}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, username: e.target.value }))
                    }
                    className="w-full rounded-3xl border border-zinc-800/70 bg-zinc-900/90 px-4 py-3 text-white outline-none focus:border-amber-400"
                    placeholder="admin"
                  />
                </div>
                <div className="space-y-2 text-sm text-zinc-300">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                    className="w-full rounded-3xl border border-zinc-800/70 bg-zinc-900/90 px-4 py-3 text-white outline-none focus:border-amber-400"
                    placeholder="admin123"
                  />
                </div>
                {error ? <p className="text-sm text-red-400">{error}</p> : null}
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:opacity-95">
                  Entrar al dashboard
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.75rem] border border-zinc-800/70 bg-black/70 p-6 text-center"
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-zinc-500">
                      {stat.label}
                    </p>
                    <p className="mt-4 text-3xl font-semibold text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-8 xl:grid-cols-[0.95fr_0.75fr]">
                <div className="rounded-[1.75rem] border border-zinc-800/70 bg-black/70 p-6">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        Inventario de platos
                      </h2>
                      <p className="mt-2 text-sm text-zinc-400">
                        Actualiza precios y controla qué platos están
                        disponibles.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInventory(initialInventory)}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-800/70 bg-zinc-900/80 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-300 transition hover:border-amber-400"
                    >
                      <RefreshCcw className="h-4 w-4" /> Restablecer
                    </button>
                  </div>

                  <div className="space-y-4">
                    {inventory.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[1.5rem] border border-zinc-800/70 bg-zinc-950/80 p-4 sm:p-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">
                              {item.categoria}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold text-white">
                              {item.nombre}
                            </h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => toggleAvailability(item.id)}
                              className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition ${item.disponible ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"}`}
                            >
                              {item.disponible ? "Activo" : "Agotado"}
                            </button>
                            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/90 px-3 py-2">
                              <label className="sr-only">Precio</label>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                value={item.precio}
                                onChange={(e) =>
                                  updatePrice(item.id, e.target.value)
                                }
                                className="w-24 bg-transparent text-right text-white outline-none"
                              />
                              <span className="text-xs text-zinc-500">USD</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-zinc-800/70 bg-black/70 p-6">
                  <div className="mb-6 flex items-center gap-3 text-amber-300">
                    <PlusCircle className="h-5 w-5" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em]">
                        Crear nueva promoción
                      </p>
                      <p className="text-sm text-zinc-400">
                        Crea un descuento rápido para tus combos.
                      </p>
                    </div>
                  </div>

                  <form className="space-y-4" onSubmit={handleNewPromo}>
                    <div className="space-y-2 text-sm text-zinc-300">
                      <label>Código de promoción</label>
                      <input
                        value={newPromo.nombre}
                        onChange={(e) =>
                          setNewPromo((prev) => ({
                            ...prev,
                            nombre: e.target.value,
                          }))
                        }
                        className="w-full rounded-3xl border border-zinc-800/70 bg-zinc-900/90 px-4 py-3 text-white outline-none focus:border-amber-400"
                        placeholder="BIRRIAFEST"
                      />
                    </div>
                    <div className="space-y-2 text-sm text-zinc-300">
                      <label>Descuento (%)</label>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={newPromo.descuento}
                        onChange={(e) =>
                          setNewPromo((prev) => ({
                            ...prev,
                            descuento: e.target.value,
                          }))
                        }
                        className="w-full rounded-3xl border border-zinc-800/70 bg-zinc-900/90 px-4 py-3 text-white outline-none focus:border-amber-400"
                        placeholder="15"
                      />
                    </div>
                    <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:opacity-95">
                      Agregar promoción
                    </button>
                  </form>
                  {successMessage ? (
                    <p className="mt-4 text-sm text-emerald-300">
                      {successMessage}
                    </p>
                  ) : null}

                  <div className="mt-8 rounded-[1.75rem] border border-zinc-800/70 bg-zinc-950/80 p-5">
                    <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-zinc-500">
                      <Tag className="h-4 w-4 text-amber-300" /> Promociones
                      activas
                    </div>
                    <div className="space-y-3">
                      {promos.map((promo) => (
                        <div
                          key={promo.id}
                          className="flex items-center justify-between rounded-3xl bg-zinc-900/90 px-4 py-3 text-sm text-zinc-200"
                        >
                          <div>
                            <p className="font-medium text-white">
                              {promo.nombre}
                            </p>
                            <p className="text-xs text-zinc-500">
                              -{promo.descuento}% descuento
                            </p>
                          </div>
                          <XCircle className="h-4 w-4 text-red-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
