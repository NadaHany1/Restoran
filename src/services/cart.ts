// import axios
// define the base url
// define types (interfaces) for (request params, response params)
// define the function documentation params
// define functions (await functions with promise and static functions)

import axios, { AxiosError } from 'axios';import { getToken } from "./auth";
import { Order } from "./orders";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface CartProduct{
    productId: string,
    title: string,
    option: string,
    quantity: number,
    price: number,
    additionalPrice: number,
    total: number
}

export interface Cart{
    id:string,
    userId:string,
    products:CartProduct[]
}

/**
 * get the registered user cart details
 * 
 * @returns Promise<Cart>
 */

export async function getCart():Promise<Cart>{
    try{
        const url = `${API_URL}/cart`
        const token = getToken();
        if (!token) throw new Error("No authentication token found");
        const response = await axios.get<Cart>(url, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    }catch(error:unknown){
        const err = error as AxiosError
        console.error("error fetching cart",err.message)
        throw err

    }
}


/**
 * update the registered user's cart
 * 
 * @param {string} productId - The product ID
 * @param {number} [quantity=1] - The quantity to set for the product
 * @param {string} [optionTitle] - Optional variant or option title
 * @returns Promise<Cart>
 */

export async function updateCart(productId:string, quantity:number = 1, optionTitle?:string):Promise<Cart>{
    try{
        const url = `${API_URL}/cart`
        const token = getToken()
        if (!token) {throw new Error("can't find user token")}
        const response = await axios.post<Cart>(
            url,
            {productId, quantity, optionTitle},
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
        return response.data;
    }catch(error:unknown){
        const err = error as AxiosError;
        console.error("can't update user cart", err.response?.data || err.message);
        throw err
    }
}


/**
 * delete all products from the user's cart
 * 
 * @returns Promise<Cart>
 */

export async function deleteCart():Promise<Cart>{
    try{
        const url =`${API_URL}/cart`
        const token = getToken()
        if (!token) {throw new Error("Can't find user token");}
        const response = await axios.delete<Cart>(url,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data;
    }catch(error:unknown){
        const err = error as AxiosError
        console.error("can't delete user's cart : ", err.response?.data || err.message)
        throw err
    }
}


/**
 * Calls the /checkout API for the currently authenticated user.
 * Uses the server-side cart automatically.
 */
export async function checkout(): Promise<Order | null> {
  try {
    const url = `${API_URL}/checkout`
    const token = getToken()
    if (!token) {throw new Error("Can't find user token");}
    const response = await axios.post<Order>(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Order created successfully:', response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error('Network or unknown error:', err.message);
    return null;
  }
}
