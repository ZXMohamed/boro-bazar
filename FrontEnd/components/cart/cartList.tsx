"use client"
import React from 'react'
import ProductList from '../common/ProductList'
import ProductListItem from '../common/ProductListItem'


function CartList() {
  return (
    <aside className='w-full lg:w-195'>
        <ProductList title='Your Cart' description={`There are ${"#####"} products in your cart`}>
            <ProductListItem product={{id:"1",brand:"das",images:["/product1.png"],name:"asdasd",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
            <ProductListItem product={{id:"1",brand:"das",images:["/product1.png"],name:"asdasd",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
            <ProductListItem product={{id:"1",brand:"das",images:["/product1.png"],name:"asdasd",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
            <ProductListItem product={{id:"1",brand:"das",images:["/product1.png"],name:"asdasd",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
        </ProductList>
    </aside>
  )
}

export default CartList