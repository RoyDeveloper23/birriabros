"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "../cart-context";

const paymentMethods = [
  { id: "card", label: "Tarjeta" },
  { id: "deuna", label: "Pago en efectivo / Deuna" },
];

type PaymentData = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  phone: string;
};

export default function CarritoPage() {
  const {
    cartItems,
    subtotal,
    cartCount,
    adjustQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiry: "",
    cvv: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const taxes = useMemo(() => subtotal * 0.15, [subtotal]);
  const total = useMemo(() => subtotal + taxes, [subtotal, taxes]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(value);

  const handleCheckout = () => {
    if (!cartItems.length) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessMessage(
        "¡Listo! Tu pedido de Birria Bros quedó registrado. Revisa tu carrito y sigue disfrutando.",
      );
      clearCart();
    }, 900);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-orange-200/30 bg-orange-950/40 p-6 shadow-xl shadow-orange-900/20 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300/80">
            Carrito
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Tu compra en Birria Bros
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-orange-100/85">
            Revisa tus platillos, modifica cantidades y completa tu pedido en
            una sola página.
          </p>
        </div>
        <div className="rounded-3xl border border-orange-400/20 bg-orange-950/70 p-4 text-right text-sm text-orange-200/80 sm:max-w-xs">
          <p>Artículos en carrito</p>
          <p className="mt-2 text-3xl font-semibold text-white">{cartCount}</p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-3xl border border-orange-200/20 bg-orange-950/60 p-8 text-center shadow-lg shadow-orange-900/10">
          <p className="text-lg font-semibold text-white">
            Tu carrito está vacío.
          </p>
          <p className="mt-3 text-sm text-orange-100/80">
            Agrega tu birria favorita desde el menú para continuar con el
            pedido.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            Ver menú
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-orange-200/15 bg-orange-950/60 p-6 shadow-xl shadow-orange-900/20">
              <h2 className="text-xl font-semibold text-white">
                Resumen del pedido
              </h2>
              <div className="mt-5 space-y-4">
                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-orange-400/10 bg-orange-950/80 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-orange-200/80">
                          {item.quantity} × {item.title}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded-full bg-orange-500/90 px-3 py-1 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
                          onClick={() => adjustQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] text-center text-sm text-orange-100">
                          {item.quantity}
                        </span>
                        <button
                          className="rounded-full bg-orange-500/90 px-3 py-1 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
                          onClick={() => adjustQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4 text-sm text-orange-200/80">
                      <span>Eliminar</span>
                      <button
                        className="rounded-full bg-orange-500 px-3 py-1 text-white transition hover:bg-orange-400"
                        onClick={() => removeItem(item.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-orange-200/15 bg-orange-950/60 p-6 shadow-xl shadow-orange-900/20">
              <h2 className="text-xl font-semibold text-white">
                Método de pago
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`rounded-3xl border px-5 py-4 text-left transition ${
                      selectedMethod === method.id
                        ? "border-orange-400 bg-orange-950"
                        : "border-orange-500/20 bg-orange-950/50 hover:border-orange-400"
                    }`}
                  >
                    <p className="text-sm font-semibold text-white">
                      {method.label}
                    </p>
                    <p className="mt-2 text-xs text-orange-200/80">
                      {method.id === "card"
                        ? "Paga con tarjeta segura"
                        : "Efectivo o Deuna al momento de la entrega"}
                    </p>
                  </button>
                ))}
              </div>

              {selectedMethod === "card" ? (
                <div className="mt-6 space-y-4">
                  <label className="block text-sm text-orange-200/80">
                    Número de tarjeta
                    <input
                      value={paymentData.cardNumber}
                      onChange={(event) =>
                        setPaymentData({
                          ...paymentData,
                          cardNumber: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-3xl border border-orange-500/20 bg-orange-950/90 px-4 py-3 text-white outline-none focus:border-orange-400"
                      placeholder="1234 5678 9012 3456"
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-orange-200/80">
                      Expiración
                      <input
                        value={paymentData.expiry}
                        onChange={(event) =>
                          setPaymentData({
                            ...paymentData,
                            expiry: event.target.value,
                          })
                        }
                        className="mt-2 w-full rounded-3xl border border-orange-500/20 bg-orange-950/90 px-4 py-3 text-white outline-none focus:border-orange-400"
                        placeholder="MM/AA"
                      />
                    </label>
                    <label className="block text-sm text-orange-200/80">
                      CVV
                      <input
                        value={paymentData.cvv}
                        onChange={(event) =>
                          setPaymentData({
                            ...paymentData,
                            cvv: event.target.value,
                          })
                        }
                        className="mt-2 w-full rounded-3xl border border-orange-500/20 bg-orange-950/90 px-4 py-3 text-white outline-none focus:border-orange-400"
                        placeholder="123"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-4 rounded-3xl border border-orange-500/20 bg-orange-950/80 p-4 text-sm text-orange-100/90">
                  <p>Elige pago en efectivo o Deuna al entregar tu pedido.</p>
                  <label className="block">
                    <span className="text-sm text-orange-200/80">
                      Número de contacto
                    </span>
                    <input
                      value={paymentData.phone}
                      onChange={(event) =>
                        setPaymentData({
                          ...paymentData,
                          phone: event.target.value,
                        })
                      }
                      className="mt-2 w-full rounded-3xl border border-orange-500/20 bg-orange-950/90 px-4 py-3 text-white outline-none focus:border-orange-400"
                      placeholder="55 1234 5678"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-orange-200/15 bg-orange-950/60 p-6 shadow-xl shadow-orange-900/20">
              <h2 className="text-xl font-semibold text-white">Pago</h2>
              <div className="mt-5 space-y-3 text-sm text-orange-100/90">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Impuestos (15%)</span>
                  <span>{formatCurrency(taxes)}</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatCurrency(total)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isProcessing}
                className="mt-6 w-full rounded-full bg-orange-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessing ? "Procesando pedido..." : "Finalizar compra"}
              </button>
            </div>
            {successMessage ? (
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-950/50 p-5 text-emerald-100">
                <p className="font-semibold text-white">Pedido completado</p>
                <p className="mt-2 text-sm text-emerald-200/90">
                  {successMessage}
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      )}
    </section>
  );
}
