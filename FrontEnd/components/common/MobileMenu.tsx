"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { CategoryT } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoSparklesOutline } from "react-icons/io5";
import { PiSignOutLight } from "react-icons/pi";
import { RiMenu3Line } from "react-icons/ri";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";

interface MobileMenuProps {
  categories: CategoryT[];
  token: string;
}

const MobileMenu = ({ categories, token }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger className="block md:hidden">
        <RiMenu3Line className="size-6!" />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="mb-4">
          <DrawerTitle>
            <Link href="/">
              <span className="sr-only">Home</span>
              <Image
                src="/images/logo.svg"
                alt="BoroBazar Logo"
                className="max-w-36 md:max-w-40"
                loading="eager"
                width={160}
                height={50}
              />
            </Link>
          </DrawerTitle>
          <DrawerDescription className="flex items-center gap-2">
            Welcome to BoroBazar{" "}
            <IoSparklesOutline size={16} className="text-primary" />
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <SearchInput />
        </div>

        <div className="no-scrollbar overflow-y-auto px-4 py-1">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${category.slug}`}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-3",
                pathname === "/shop" && activeCategory === category.slug
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-muted",
              )}
              onClick={() => setOpen(false)}
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-[#f6f6f6]">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-3/4"
                  width={20}
                  height={20}
                />
              </span>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>

        {token ? (
          <DrawerFooter className="flex-row justify-between border-t">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/favorites">
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
              <PiSignOutLight className="size-6!" />
            </Button>
          </DrawerFooter>
        ) : (
          <DrawerFooter className="border-t">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary"
            >
              <Link href="/register">Register</Link>
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
