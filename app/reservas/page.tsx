"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";

export default function ReservasPage() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    fecha: "",
    hora: "",
    personas: "2",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !form.nombre ||
      !form.telefono ||
      !form.correo ||
      !form.fecha ||
      !form.hora ||
      !form.personas
    ) {
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="pt-28 pb-24">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-zinc-800/90 bg-zinc-950/80 p-8 shadow-2xl shadow-red-950/20 md:p-12">
          <div className="mb-8 flex flex-col gap-4 text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-amber-300">
              <CalendarDays className="h-4 w-4" /> Reservas
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Reserva tu mesa en Birria Bros
            </h1>
            <p className="max-w-2xl text-zinc-400">
              Llena el formulario y asegura tu lugar en la mesa. Nuestro equipo
              confirma la reserva rápidamente por SMS y correo.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_0.85fr]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-zinc-300">
                  Nombre completo
                  <div className="rounded-3xl bg-zinc-900/80 px-4 py-3 outline outline-1 outline-zinc-800 focus-within:outline-amber-400">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <User className="h-4 w-4" />
                      <input
                        value={form.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        placeholder="Ej. Carlos Gómez"
                      />
                    </div>
                  </div>
                </label>
                <label className="space-y-2 text-sm text-zinc-300">
                  Teléfono
                  <div className="rounded-3xl bg-zinc-900/80 px-4 py-3 outline outline-1 outline-zinc-800 focus-within:outline-amber-400">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Phone className="h-4 w-4" />
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={(e) =>
                          handleChange("telefono", e.target.value)
                        }
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        placeholder="+52 55 1234 5678"
                      />
                    </div>
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-zinc-300">
                  Correo electrónico
                  <div className="rounded-3xl bg-zinc-900/80 px-4 py-3 outline outline-1 outline-zinc-800 focus-within:outline-amber-400">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Mail className="h-4 w-4" />
                      <input
                        type="email"
                        value={form.correo}
                        onChange={(e) => handleChange("correo", e.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </div>
                </label>
                <label className="space-y-2 text-sm text-zinc-300">
                  Cantidad de personas
                  <div className="rounded-3xl bg-zinc-900/80 px-4 py-3 outline outline-1 outline-zinc-800 focus-within:outline-amber-400">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Users className="h-4 w-4" />
                      <input
                        type="number"
                        min="1"
                        value={form.personas}
                        onChange={(e) =>
                          handleChange("personas", e.target.value)
                        }
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        placeholder="2"
                      />
                    </div>
                  </div>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-zinc-300">
                  Fecha
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={(e) => handleChange("fecha", e.target.value)}
                    className="w-full rounded-3xl border border-zinc-800/70 bg-zinc-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
                  />
                </label>
                <label className="space-y-2 text-sm text-zinc-300">
                  Hora
                  <input
                    type="time"
                    value={form.hora}
                    onChange={(e) => handleChange("hora", e.target.value)}
                    className="w-full rounded-3xl border border-zinc-800/70 bg-zinc-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
                  />
                </label>
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:opacity-95">
                Confirmar reserva
              </button>
            </form>

            <div className="rounded-[1.75rem] border border-amber-400/10 bg-amber-500/5 p-6 text-sm text-zinc-300">
              <div className="flex items-center gap-3 text-amber-300">
                <CheckCircle2 className="h-5 w-5" />
                <h2 className="text-lg font-semibold text-white">
                  Servicio de reservas
                </h2>
              </div>
              <p className="mt-4 leading-7 text-zinc-400">
                Reserva con confianza y disfruta de la mejor birria de la
                ciudad. Recibirás confirmación simulada por SMS y correo.
              </p>
              <ul className="mt-6 space-y-3 text-zinc-300">
                <li className="inline-flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />{" "}
                  Mesa lista al llegar
                </li>
                <li className="inline-flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />{" "}
                  Confirmación inmediata
                </li>
                <li className="inline-flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />{" "}
                  Ambiente auténtico
                </li>
              </ul>
            </div>
          </div>

          {success ? (
            <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/10 p-6 text-white shadow-xl shadow-emerald-500/10">
              <div className="flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="h-6 w-6" />
                <div>
                  <p className="font-semibold">¡Reserva Confirmada!</p>
                  <p className="text-sm text-zinc-200">
                    Te hemos enviado un SMS y correo de confirmación
                    automáticamente.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
