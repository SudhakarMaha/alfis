import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "./catalog";

export type CartItem = { id: string; qty: number };

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type OrderItem = { id: string; name: string; price: number; qty: number; image: string; weight: string };

export type Order = {
  id: string;
  createdAt: number;
  status: OrderStatus;
  customer: { name: string; email: string; phone: string; address: string; city: string; state: string; pincode: string; landmark?: string };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  payment: "cod" | "upi" | "card";
};

type StoreCtx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  cartCount: number;
  cartTotal: number;
  cartDetailed: { product: Product; qty: number }[];
  orders: Order[];
  addOrder: (o: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  isAdmin: boolean;
  loginAdmin: (u: string, p: string) => boolean;
  logoutAdmin: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);
const KEY_CART = "ang_cart_v1";
const KEY_WISH = "ang_wish_v1";
const KEY_ORDERS = "ang_orders_v1";
const KEY_ADMIN = "ang_admin_v1";

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin123";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(KEY_CART);
      const w = localStorage.getItem(KEY_WISH);
      const o = localStorage.getItem(KEY_ORDERS);
      const a = localStorage.getItem(KEY_ADMIN);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
      if (o) setOrders(JSON.parse(o));
      if (a === "1") setIsAdmin(true);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem(KEY_CART, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(KEY_WISH, JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(KEY_ORDERS, JSON.stringify(orders)); }, [orders, hydrated]);

  const value = useMemo<StoreCtx>(() => {
    const cartDetailed = cart
      .map((c) => {
        const product = products.find((p) => p.id === c.id);
        return product ? { product, qty: c.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];

    return {
      cart,
      wishlist,
      cartDetailed,
      cartCount: cart.reduce((n, c) => n + c.qty, 0),
      cartTotal: cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0),
      orders,
      isAdmin,
      addOrder: (o: Order) => setOrders((prev) => [o, ...prev]),
      updateOrderStatus: (id: string, status: OrderStatus) =>
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o))),
      loginAdmin: (u: string, p: string) => {
        if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
          setIsAdmin(true);
          try { localStorage.setItem(KEY_ADMIN, "1"); } catch {}
          toast.success("Welcome, Admin");
          return true;
        }
        toast.error("Invalid credentials");
        return false;
      },
      logoutAdmin: () => {
        setIsAdmin(false);
        try { localStorage.removeItem(KEY_ADMIN); } catch {}
        toast("Logged out");
      },
      addToCart: (id, qty = 1) => {
        setCart((prev) => {
          const e = prev.find((p) => p.id === id);
          if (e) return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { id, qty }];
        });
        const p = products.find((x) => x.id === id);
        if (p) toast.success(`${p.name} added to cart`);
      },
      removeFromCart: (id) => setCart((prev) => prev.filter((p) => p.id !== id)),
      updateQty: (id, qty) =>
        setCart((prev) =>
          qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => (p.id === id ? { ...p, qty } : p))
        ),
      clearCart: () => setCart([]),
      toggleWishlist: (id) => {
        setWishlist((prev) => {
          if (prev.includes(id)) { toast("Removed from wishlist"); return prev.filter((x) => x !== id); }
          toast.success("Added to wishlist");
          return [...prev, id];
        });
      },
      isWishlisted: (id) => wishlist.includes(id),
    };
  }, [cart, wishlist, orders, isAdmin]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
