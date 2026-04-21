import { supabase } from "@/lib/supabase/client";

type OrderStatus = "pending" | "preparing" | "delivered";

export async function getOrdersWithItems(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
            *,
            order_item (*)
        `,
    )
    .eq("user_id", userId)
    .order("order_date", { ascending: false });

  if (error) {
    console.error(error);
    return null;
  }

  console.log("orders data : ", data);
  return data;
}

export function getOrderStatus(createdAt: string): OrderStatus{
  const now = new Date();
  const created = new Date(createdAt);
  const diff = (now.getTime() - created.getTime()) / (1000 * 60);

  if (diff < 0.5) return "pending";
  if (diff < 10) return "preparing";
  return "delivered";
}
