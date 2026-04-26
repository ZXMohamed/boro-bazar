import React from 'react'
import Image from 'next/image'
import { ProductT } from '@/types/product';


interface OrderItemsInterface {
    product: ProductT;
    currency: string;
    price: number;
    quantity: number;
}

function OrderItem({ product: { name = "", images = [""] }, currency = "", price = 0, quantity = 0 }: OrderItemsInterface) {
  return (
    <div className='flex justify-between items-center pr-4'>
        <div className='flex '>
            <Image src={images[0]} alt={name} width={64} height={64} className='w-16 h-16'/>
            <div>
                <h3 className='line-clamp-1 text-[16px]'>{name}</h3>
                <h4 className='text-[16px]'>Qty : {quantity}</h4>
            </div>
        </div>
        <h4 className='text-[16px]'><bdi>{currency}</bdi>{price}</h4>
    </div>
  )
}

export default OrderItem