import axios from "axios"
import { CartProduct } from "./cart";
import { getToken } from "./auth";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Order{
    id:string,
    userId:string,
    items:CartProduct[],
    orderTotal:number,
    status:string,
    date:string
}

/**
 * get the registered user's orders
 * 
 * @returns Promise<Order[]>
 */

export async function getOrders():Promise<Order[] | null> {
    try{
        const url = `${API_URL}/orders`
        const token = getToken()
        if (!token) { throw new Error("cann't find user token from orders")}
        const response = axios.get<Order[]>(
            url,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return (await response).data;
    }catch(error:unknown){
        const err = error as AxiosError
        console.error("cann't fetch orders : ", err.message)
        return null
    }

}