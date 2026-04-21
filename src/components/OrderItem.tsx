"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Order } from "@/types/Types";
import Image from "next/image";
import { getOrderStatus } from "@/services/orders";

interface OrderItemProps {
  orders: Order[] | null;
}

const OrderItem = ({ orders }: OrderItemProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const statusStyles = {
    pending: "bg-amber-200",
    preparing: "bg-amber-500",
    delivered: "bg-green-500"
  };

  return (
    <div className="w-full ">
      {orders?.map((order, index) => {
        const isOpen = activeIndex === index;
        const orderItems = orders[index].order_item?.filter((item) => item.order_id === order.id);
        const status = getOrderStatus(order.order_date)

        return (
          <div key={order.id}>
            <button
              onClick={() => toggleItem(index)}
              className="w-[90vw] lg:w-[60vw] m-auto mt-2 flex justify-between items-center bg-gray-100 p-5 cursor-pointer rounded-2xl"
            >
              <div className="flex flex-col text-left text-md md:text-xl">
                <span className="font-bold">Order #{order.id}</span>
                <span className="text-sm md:text-lg text-gray-600">
                  ${order.total_price}
                </span>
              </div>
              <div>
                <div
                  className={`inline-block w-2 aspect-square rounded-full mx-1 ${statusStyles[status]}`}
                ></div>
                <span className="">{status}</span>
              </div>
              <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
            </button>

            <div
              className={`w-[90vw] lg:w-[60vw] m-auto overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              {orderItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full gap-3 border-b border-gray-300 bg-white shadow-2xl p-2"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded my-auto"
                    width={100}
                    height={100}
                  />

                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-800">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItem;