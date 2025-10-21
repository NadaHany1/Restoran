// _____1. import important libraries and plugins like axios
// _____1.2 import or declare the base url 
// _____2. define types (interface)
// 2.1 define request parameters types
// _____2.2 define response parameters types
// 3. define Params
// 4. define functions 
    // 4.1 async functions with Promise
    // 4.2 static functions 

import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface ProductOptions{
    title:string;
    additionalPrice:number;
}

export interface Product{
    id:string;
    title:string;
    desc:string;
    img:string;
    price:number,
    category:string
    options:ProductOptions[];
}


/**
 * Fetches all products or filters by category from your API.
 * 
 * @param category Optional category name (e.g., "pizza", "burger", etc.)
 * @returns Promise<Product[]>
 */


export async function fetchProducts(category?:string): Promise<Product[]> {
    try{
        const query = category ? `?category=${encodeURIComponent(category)}` : '';
        const url = `${API_URL}/products/${query}`

        const response = await axios.get<Product[]>(url)
        return response.data;
    }catch(error: unknown){
        const err = error as AxiosError;
        console.error("error fetching products:", err.message || error);
        return [];
    }
}


/**
 * get single product by id
 * @Param id - the product id
 * @returns Promise<Product>
 */
export async function getSingleProduct(id:number): Promise<Product> {
    try{
        const url = `${API_URL}/products/${id}`
        const response = await axios.get<Product>(url);
        return response.data;
    }catch (error: unknown) {
        const err = error as AxiosError;
        console.error(`Can't get the product with id = ${id}`, err.message);
        throw err;
    }
}

