import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { supabase } from '@/lib/supabase/client';

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  return (
    <div className="flex flex-row flex-wrap text-orange-500">
      {data?.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="flex flex-col justify-between w-full sm:w-1/3 lg:w-1/4 aspect-square border-r-2 border-b-2 border-orange-500 p-6 group hover:cursor-auto"
        >
          {/* IMAGE CONTAINER */}
          {item.image && (
            <div className="relative flex-4">
              <Image
                src={item.image}
                alt={`${item.title}`}
                fill
                className="object-contain"
              />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex-1 flex justify-between gap-2 items-end font-bold">
            <h1 className="text-2xl">{item.title}</h1>
            <h2 className="text-xl">{item.price}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage
