import Link from "next/link";
import { Globe, Link2, Phone, MapPin, Clock3, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-transparent bg-gradient-to-r from-[#fff3ed] to-[#fff7f0] text-[#0b0b0b]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 md:px-8 lg:flex-row lg:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-2xl font-semibold uppercase tracking-[0.22em] text-[#b91c1c]">
            Birria Bros
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-700">
            Cocina mexicana con alma urbana. Birrias jugosas, tacos chispeantes
            y promociones pensadas para compartir.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
            <span className="inline-flex items-center gap-2 text-[#f97316]">
              <MapPin className="h-4 w-4" />
              Urdesa Norte, GYE
            </span>
            <span className="inline-flex items-center gap-2 text-[#b91c1c]">
              <Phone className="h-4 w-4" />
              +593 98 765 4321
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr]">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">
              Horarios
            </p>
            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-4 text-sm text-zinc-300">
              <div className="flex items-center gap-2 text-amber-300">
                <Clock3 className="h-4 w-4" />
                Lun - Dom
              </div>
              <p className="mt-2 leading-6">
                13:00 - 21:00 | Cocina abierta cada día
              </p>
              <p className="mt-2 leading-6 text-zinc-500">
                Cerramos solamente para mantener la calidad y el sazón.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">
              Síguenos
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#fff3ed] px-4 py-3 text-sm transition hover:border-[#f59e0b] hover:text-[#b91c1c]"
              >
                <Globe className="h-4 w-4 text-pink-500" />
                Instagram
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-[#fff3ed] px-4 py-3 text-sm transition hover:border-[#b91c1c] hover:text-[#b91c1c]"
              >
                <Link2 className="h-4 w-4 text-blue-400" />
                Facebook
              </Link>
            </div>
            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/80 p-4 text-sm text-zinc-300">
              <p className="font-semibold text-white">Contacto rápido</p>
              <p className="mt-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400" /> hola@birriabros.mx
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-transparent bg-transparent py-4 text-center text-xs uppercase tracking-[0.2em] text-zinc-600">
        © 2026 Birria Bros. Todos los derechos reservados.
      </div>
    </footer>
  );
}
