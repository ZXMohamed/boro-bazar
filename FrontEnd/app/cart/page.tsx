import CartList from "@/components/cart/cartList";
import CartPricing from "@/components/cart/cartPricing";

const CartPage = () => {
  return (
    <section className="container m-auto flex justify-between gap-x-2 gap-y-5 px-5 py-5 max-lg:flex-wrap sm:px-10 sm:py-10 2xl:px-20">
      <CartList />
      <CartPricing />
    </section>
  );
};

export default CartPage;
