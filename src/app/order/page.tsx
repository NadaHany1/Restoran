'use client'
import OrderItem from '@/components/OrderItem'
import React, { useEffect, useState } from 'react'
import { Order } from '@/types/Types';
import {getOrdersWithItems} from '@/services/orders';
import { useAuth } from '@/context/AuthContext';

const OrderPage = () => {

  const [orders, setOrders] = useState<Order[] | null>([])
  const [loading, setLoading] = useState(true);
  
  const {user} = useAuth();

  useEffect(() => {
    const getUserOrders = async () => {
      if (user) {
        try {
          const orders = await getOrdersWithItems(user?.id);
          setOrders(orders);
        } catch (error) {
          console.log("cannot get the orders for this user", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getUserOrders();
  }, [user]);

  return (
    <div>
      <h1 className="text-4xl text-orange-500 text-center font-bold my-[5vh] uppercase">
        Orders
      </h1>
      <div className="mb-[10vh]">
        {user ? (
          <div>
            {orders === null || orders.length === 0 ? (
              <p className="mt-[25vh] text-gray-500 text-2xl text-center">
                there is no orders yet
              </p>
            ) : (
              <OrderItem orders={orders} />
            )}
          </div>
        ) : (
          <div className="w-full text-center">
            <p className="mt-[25vh] text-gray-500  text-2xl">
              Please Login First
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage
