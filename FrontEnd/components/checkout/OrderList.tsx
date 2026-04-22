import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import OrderItem from '../common/OrderItem'
import { Button } from '../ui/button'

function OrderList() {
  return (
    <aside className='w-full lg:w-87.5'>
        <Card className='py-3'>
            <CardHeader className='px-0'>
                <CardTitle className='px-6 py-3'>
                    <h2 className='text-[20px]'>Your Order</h2>
                </CardTitle>
                <CardDescription className='flex justify-between text-primary-text text-[16px] font-medium py-4 px-6 border-t border-b'>
                    <span>Product</span>
                    <span>Subtotal</span>
                </CardDescription>
            </CardHeader>
            <CardContent className='px-0 flex flex-col gap-y-4'>
                <OrderItem currency='$' product={{images:['/product1.png'], name:'Fortune Sunlite Refined Sunflower Oil 1 L'}} price={99} quantity={2} />
                <OrderItem currency='$' product={{images:['/product1.png'], name:'Fortune Sunlite Refined Sunflower Oil 1 L'}} price={99} quantity={2} />
                <OrderItem currency='$' product={{images:['/product1.png'], name:'Fortune Sunlite Refined Sunflower Oil 1 L'}} price={99} quantity={2} />
                <OrderItem currency='$' product={{images:['/product1.png'], name:'Fortune Sunlite Refined Sunflower Oil 1 L'}} price={99} quantity={2} />
            </CardContent>
            <CardFooter className='py-5'>
                <Button className='w-full h-12.5 rounded-sm text-[16px]'>Checkout</Button>
            </CardFooter>
        </Card>
    </aside>
  )
}

export default OrderList