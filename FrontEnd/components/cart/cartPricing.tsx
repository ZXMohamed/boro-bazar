import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";


function CartPricing() {
  return (
    <aside className="w-full lg:w-87.5">
      <Card className="gap-y-2 py-4">
        <CardHeader>
          <CardTitle>
            <h2 className="text-primary-text text-[20px] font-medium">
              Cart Totals
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="border-t p-0 py-2">
          <div className="flex justify-between px-6 py-1.5 text-[14px]">
            <span className="text-primary-text">Subtotal</span>
            <span className="text-focused-price font-bold">
              <bdi>{"$"}</bdi>
              {2.133}
            </span>
          </div>
          <div className="flex justify-between px-6 py-1.5 text-[14px]">
            <span className="text-primary-text">Shipping</span>
            <span className="text-primary-text font-bold">Free</span>
          </div>
          <div className="flex justify-between px-6 py-1.5 text-[14px]">
            <span className="text-primary-text">Estimate for</span>
            <span className="text-primary-text font-bold">India</span>
          </div>
          <div className="flex justify-between px-6 py-1.5 text-[14px]">
            <span className="text-primary-text">Subtotal</span>
            <span className="text-focused-price font-bold">
              <bdi>{"$"}</bdi>
              {2.133}
            </span>
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button className="h-12 w-full rounded-sm text-[16px]">Next</Button>
        </CardFooter>
      </Card>
    </aside>
  );
}

export default CartPricing;
