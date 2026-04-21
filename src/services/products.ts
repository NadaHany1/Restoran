import { Product } from "@/types/Types";
import { supabase } from "@/lib/supabase/client";
/**
 * get single product by id
 * @Param id - the product id
 * @returns Promise<Product>
 */
export async function getSingleProduct(id: number): Promise<Product |null>{
    try{
        const {data, error} = await supabase.from("products").select("*").eq("id", id).single();
        if (error) {
          console.error("Error fetching product:", error);
          return null;
        }
        return data;
    }catch{
        console.error("cannot get product with id: ", id);
        return null
    }
}
