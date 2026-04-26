import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ProductListT } from "@/types/product";


function ProductList({ title, description, children }: ProductListT) {
  return (
    <Card className="gap-y-4">
      <CardHeader>
        <CardTitle>
          <h1 className="text-primary-text text-[20px] font-medium">{title}</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-secondary-text text-[15px]">{description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}

export default ProductList;

//*example
/*
    <ProductList title='Your Cart' description={`There are ${"#####"} products in your cart`}>
        <ProductListItem product={{id:"1",brand:"brand",images:["/product1.png"],name:"product 1",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
        <ProductListItem product={{id:"1",brand:"brand",images:["/product1.png"],name:"product 2",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
        <ProductListItem product={{id:"1",brand:"brand",images:["/product1.png"],name:"product 3",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
        <ProductListItem product={{id:"1",brand:"brand",images:["/product1.png"],name:"product 4",rating:3.5,originalPrice:54,price:45}} currency="$" applyQuantity onQuantityChange={(id, quantity, price) => console.log(id, quantity, price)} onDelete={(id) => console.log(id)} />
    </ProductList>
*/
