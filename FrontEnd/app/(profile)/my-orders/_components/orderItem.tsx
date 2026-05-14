import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { ProductT } from '@/types/product';
import OrderItem from '@/components/common/OrderItem';

type orderProduct = {
    product: ProductT;
    price: number;
    quantity: number;
}

interface OrderDetailsItemProps {
  currency: string;
  data: {
    date: string;
    total: number;
    products: orderProduct[];
  };
}

function OrderDetailsItem({ data, currency }: OrderDetailsItemProps) {
  return (
    <Card className='rounded-none'>
        <CardHeader>
            <CardTitle>Order Id</CardTitle>
            <CardDescription>
                <p>Date : {data.date }</p>
                <p>Total : {data.total}{currency}</p>
            </CardDescription>
        </CardHeader>
        <CardContent>
            {data.products.map((item,index) => <OrderItem
                  key={index}
                  product={{ id:item.product.id,price:item.product.price,name: item.product.name, images: item.product.images }}
                  price={item.price}
                  quantity={item.quantity}
                  currency={currency}
                />
            )}
        </CardContent>
    </Card>
  )
}

export default OrderDetailsItem;