import OffersCard from "./OffersCard";

export interface OfferT {
  id: number;
  title: string;
  sub_title: string;
  image: string;
}

const offers: OfferT[] = [
  {
    id: 1,
    title: "We provide you the best quality products",
    sub_title: "A family place for grocery",
    image: "/orangeJuice.png",
  },
  {
    id: 2,
    title: "We make your grocery shopping more exiting",
    sub_title: "Shine the morning",
    image: "/popcorn.png",
  },
  {
    id: 3,
    title: "The one supermarket that saves your money",
    sub_title: "Breakfast made better",
    image: "/fruites.png",
  },
];

const Offers = () => {
  return (
    <section className="sec-layout grid grid-cols-1 items-center justify-between gap-5 md:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <OffersCard key={offer.id} offer={offer} />
      ))}
    </section>
  );
};

export default Offers;
