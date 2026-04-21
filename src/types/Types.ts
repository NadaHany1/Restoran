export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
};

export type signUpData = Omit<User, "id">;

export type Product = {
  id: number;
  title: string;
  description?: string;
  image: string;
  price: number;
  category: string;
  options: { title: string; additionalPrice: number }[];
};

export type TCartItem = {
  id: string;
  product_id: number;
  title: string;
  image:string;
  size: string;
  quantity: number;
  unit_price: number;
  total_price?: number;
};

export type TCartItemInsert = Omit<TCartItem, "id">;

export type Order = {
  id: number;
  user_id: string;
  total_price: number;
  order_date: string;
  order_item: TOrderItem[];
}

export type TOrderItem ={
  id: string;
  product_id: string;
  order_id: number;
  title: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}


export type CreateOrderInput = Omit<Order, "id"|"order_date"|"order_item">

export type OrderItemInput = Omit<TOrderItem, "id">