"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  adjustQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("birriaCart");
    if (!stored) return;
    try {
      setCartItems(JSON.parse(stored));
    } catch {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("birriaCart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("birriaCartUpdated"));
  }, [cartItems]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const adjustQuantity = (id: string, delta: number) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        addToCart,
        adjustQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
