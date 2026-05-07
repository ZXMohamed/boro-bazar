"use client"
import React from "react";
import { IoMdClose } from "react-icons/io";
import Rate from "./Rate";
import { offerCalculate } from "@/utils/offerCalculate";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ProductT } from "@/types/product";


interface ProductListItemInterface {
  product: ProductT;
  currency: string;
  applyQuantity?: boolean;
  onQuantityChange?: (id: string, quantity: number, price: number) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

function ProductListItem({ product: { id = "", images = [""], brand = "", name = "", originalPrice = 0, price = 0, rating = 0 }, currency = "", applyQuantity = false, onQuantityChange = () => { }, onDelete=()=>{ }, className = ""}: ProductListItemInterface) {
  return (
    <div
      className={cn(
        "flex w-full justify-between border-b py-3",
        className,
      )}
    >
        <div className="flex items-center gap-x-2">
            <Image src={images[0]} alt={name} width={100} height={100} className="h-25 w-25"/>
            <div className="flex flex-col gap-y-2">
            <span className="text-secondary-text text-[14px]">{brand}</span>
            <h2 className="text-primary-text text-[16px] font-medium">{name}</h2>
            <Rate rate={rating} />
            <div className="flex flex-wrap items-center gap-2.5">
                {applyQuantity && (
                <select defaultValue={1} onChange={(e) => onQuantityChange(id, parseInt(e.target.value), price)} className="bg-secondary-input rounded-md px-1 py-2 text-[12px]">
                    {Array.from({ length: 50 }).map((_, inx) => {
                    const value = inx + 1;
                    return (
                        <option key={inx} value={value} selected={value === 1}>
                        Qty:{value}
                        </option>
                    );
                    })}
                </select>
                )}
                <span className="text-focused-price text-16px">
                <bdi>{currency}</bdi>
                {price}
                </span>
                <span className="text-muted-price text-16px">
                <bdi>{currency}</bdi>
                {originalPrice}
                </span>
                <span className="text-primary text-16px mx-2 font-bold">
                {offerCalculate(price, originalPrice)}% OFF
                </span>
            </div>
            </div>
        </div>
        <div className="mx-6 my-3">
            <button onClick={() => onDelete(id)} className="cursor-pointer">
            <IoMdClose size={25}/>
            </button>
        </div>
    </div>
  );
}

export default ProductListItem;

//*example

/*
  <ProductListItem product={{id:"1",brand:"brand",images:["/product1.png"],name:"product 1",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
*/
