import ProfileCard from "../_components/ProfileCard";
import OrderDetailsItem from "./_components/orderItem";



const MyOrdersPage = () => {
  return (
    <ProfileCard title="My Orders" subTitle="View and manage your orders">
      <OrderDetailsItem data={{ date: "asdas", total: 13132, products: [{price:121,quantity:1, product: { id: "m", price: 12, name: "asd", images: ["/product1.png"] } }]}} currency="$" />
      <OrderDetailsItem data={{ date: "asdas", total: 13132, products: [{price:121,quantity:1, product: { id: "m", price: 12, name: "asd", images: ["/product1.png"] } }]}} currency="$" />
    </ProfileCard>
  );
};

export default MyOrdersPage;
