import { CategoryT } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiSignOutFill } from "react-icons/pi";
import MobileMenu from "../common/MobileMenu";
import SearchInput from "../common/SearchInput";
import { Button } from "../ui/button";

export const categories: CategoryT[] = [
  {
    id: "1",
    name: "Fruits & Vegetables",
    image: "/image.png",
    slug: "fruits-vegetables",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Meats & Seafood",
    image: "/image.png",
    slug: "meats-seafood",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Breakfast & Dairy",
    image: "/image.png",
    slug: "breakfast-dairy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Breads & Bakery",
    image: "/image.png",
    slug: "breads-bakery",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Beverages",
    image: "/image.png",
    slug: "beverages",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Frozen Foods",
    image: "/image.png",
    slug: "frozen-foods",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "7",
    name: "Biscuits & Snacks",
    image: "/image.png",
    slug: "biscuits-snacks",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "8",
    name: "Grocery & Staples",
    image: "/image.png",
    slug: "grocery-staples",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "9",
    name: "Baby & Pregnancy",
    image: "/image.png",
    slug: "baby-pregnancy",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "10",
    name: "Healthcare",
    image: "/image.png",
    slug: "healthcare",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

const Navbar = () => {
  const token = "";

  return (
    <header>
      <div className="border-b">
        <div className="sec-layout flex items-center justify-between py-3.5 md:gap-10 lg:gap-20">
          <Link href="/">
            <span className="sr-only">Home</span>
            <Image
              src="/logo.svg"
              alt="BoroBazar Logo"
              className="max-w-36 md:max-w-40"
              loading="eager"
              width={160}
              height={100}
            />
          </Link>

          <div className="hidden w-full max-w-2xl md:block">
            <SearchInput />
          </div>

          {token ? (
            <div className="hidden items-center md:flex md:gap-4 lg:gap-6">
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/my-list">
                  <IoIosHeartEmpty className="size-6!" />
                  <span className="bg-notify-dot absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs text-white">
                    5
                  </span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/cart">
                  <HiOutlineShoppingBag className="size-6!" />
                  <span className="bg-notify-dot absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs text-white">
                    3
                  </span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <PiSignOutFill className="size-6!" />
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-1 md:flex">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <div className="h-3 w-[1.5px] bg-black/70" />
              <Button variant="ghost" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          <MobileMenu categories={categories} token={token} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
