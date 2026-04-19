import AddressList from "@/components/checkout/AddressList";
import OrderList from "@/components/checkout/OrderList";

const CheckoutPage = () => {
  return (
    <section className="container m-auto flex justify-between gap-x-2 gap-y-5 px-5 py-5 max-lg:flex-wrap sm:px-10 sm:py-10 2xl:px-20">
      <AddressList />
      <OrderList />
    </section>
  );
};

export default CheckoutPage;
