import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TCartItem, TCartItemInsert } from "@/types/Types";
import { supabase } from "@/lib/supabase/client";

interface CartState {
  cart: TCartItem[];
  addToCart: (item: TCartItemInsert, userId: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => void;
  updateQuantity: (id: string, delta: number) => void;
  totalPrice: () => number;
  loadCart: (userID: string) => Promise<void>;
  checkout: (userId: string | null) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: async (item: TCartItemInsert, userId: string) => {
        const previousCart = get().cart;

        try {
          // 1️⃣ Get cart
          const { data, error } = await supabase
            .from("cart")
            .select("id")
            .eq("user_id", userId)
            .single();

          let cartData = data;
          const cartError = error;

          // 2️⃣ Create cart if not exists
          if (cartError || !cartData) {
            const { data: newCart, error: createError } = await supabase
              .from("cart")
              .insert({ user_id: userId })
              .select("id")
              .single();

            if (createError || !newCart) {
              throw new Error("Failed to create cart");
            }

            cartData = newCart;
          }

          const cartId = cartData!.id;

          // 3️⃣ Check existing items
          const { data: existingItems, error: fetchError } = await supabase
            .from("cart_item")
            .select("*")
            .eq("cart_id", cartId)
            .eq("product_id", item.product_id);

          if (fetchError) throw fetchError;

          const existingItem = existingItems?.find(
            (i) => JSON.stringify(i.size) === JSON.stringify(item.size),
          );

          // 4️⃣ Update quantity if exists
          if (existingItem) {
            const newQuantity = existingItem.quantity + 1;

            const { data: updatedItem, error: updateError } = await supabase
              .from("cart_item")
              .update({
                quantity: newQuantity,
              })
              .eq("id", existingItem.id)
              .select()
              .single();

            if (updateError || !updatedItem) throw updateError;

            set((state) => ({
              cart: state.cart.map((i) =>
                i.id === updatedItem.id ? updatedItem : i,
              ),
            }));
          } else {
            // 5️⃣ Insert new item
            const quantity = item.quantity || 1;

            const { data: insertedItem, error: insertError } = await supabase
              .from("cart_item")
              .insert({
                cart_id: cartId,
                product_id: item.product_id,
                size: item.size,
                quantity,
                unit_price: item.unit_price,
                title: item.title,
                image: item.image,
              })
              .select()
              .single();

            if (insertError || !insertedItem) throw insertError;

            set((state) => ({
              cart: [...state.cart, insertedItem],
            }));
          }
        } catch (error) {
          console.error("addToCart failed:", error);
          set({ cart: previousCart });
        }
      },

      removeFromCart: async (id: string) => {
        const previousCart = get().cart;

        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));

        supabase
          .from("cart_item")
          .delete()
          .eq("id", id)
          .then(({ error }) => {
            if (error) {
              console.error("Supabase delete error:", error);
              set({ cart: previousCart });
            }
          });
      },

      loadCart: async (userId: string) => {

        const { data: cartData, error: cartError } = await supabase
          .from("cart")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (cartError || !cartData)
          return console.error("Cannot get cart id:", cartError);

        const cartID = cartData.id;

        const { data: itemsData, error: itemsError } = await supabase
          .from("cart_item")
          .select(
            `
            id,
            product_id, 
            size,
            quantity, 
            unit_price, 
            total_price, 
            title,
            image
            `,
          )
          .eq("cart_id", cartID)
          .order("created_at", { ascending: false });

        if (itemsError)
          return console.error("Cannot get cart items:", itemsError);

        set({ cart: itemsData || [] });
      },

      clearCart: () => {
        set({ cart: [] });
        useCartStore.persist.clearStorage();
      },

      updateQuantity: (id: string, num: number) => {
        const previousCart = get().cart;
        const currentItem = get().cart.find((item) => item.id === id);

        if (!currentItem) return;

        const newQuantity = Math.max(1, currentItem.quantity + num);
        const newTotalPrice = newQuantity * currentItem.unit_price;

        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: newQuantity, total_price: newTotalPrice }
              : item,
          ),
        }));

        supabase
          .from("cart_item")
          .update({ quantity: newQuantity })
          .eq("id", id)
          .then(({ error }) => {
            if (error) {
              console.error("update failed", error);
              set({ cart: previousCart });
            }
          });
      },

      totalPrice: () =>
        parseFloat(
          get()
            .cart.reduce(
              (sum, item) => sum + item.unit_price * item.quantity,
              0,
            )
            .toFixed(2),
        ),

      checkout: async (userId: string | null) => {
        if (!userId) {
          throw new Error("User not authenticated");
        }

        try {
          const { data: newOrder, error: newOrderError } = await supabase
            .from("orders")
            .insert({
              user_id: userId,
              total_price: get().totalPrice(),
            })
            .select()
            .single();

          if (newOrderError || !newOrder) {
            throw new Error("Failed to create order");
          }

          const itemsToInsert = get().cart.map((item) => ({
            order_id: newOrder.id,
            product_id: item.product_id,
            title: item.title,
            image: item.image,
            size: item.size,
            quantity: item.quantity,
            price: Number((item.unit_price * item.quantity).toFixed(2)),
          }));

          const { error: orderItemsError } = await supabase
            .from("order_item")
            .insert(itemsToInsert);

          if (orderItemsError) {
            throw new Error("Failed to create order items");
          }

          const { data: cartId, error: cartIdError } = await supabase
            .from("cart")
            .select("id")
            .eq("user_id", userId)
            .single();

          if (cartIdError) {
            throw new Error("Failed to fetch cart id");
          }

          const { data: deleteData, error: deleteError } = await supabase
            .from("cart_item")
            .delete()
            .eq("cart_id", cartId.id);

          if (deleteError) {
            throw new Error("Failed to delete cart items");
          }

          set({ cart: [] });
          useCartStore.persist.clearStorage();
        } catch (error) {
          console.error("Checkout failed:", error);
          throw error;
        }
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);