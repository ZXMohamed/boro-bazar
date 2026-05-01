"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuHeart, LuMapPin, LuUserRound, LuX } from "react-icons/lu";

const profileNav = [
  { icon: LuUserRound, title: "My Profile", href: "/my-profile" },
  { icon: LuMapPin, title: "Address", href: "/address" },
  { icon: LuHeart, title: "My List", href: "/my-list" },
  { icon: HiOutlineShoppingBag, title: "My Orders", href: "/my-orders" },
];

const ProfileMobileMenu = () => {
  const user = {
    name: "Hambozo Elbozo",
    email: "Hambozo_Elbozo@gmail.com",
    image: "/userImg.png",
  };

  return (
    <div className="flex w-full items-center justify-between gap-5 rounded-lg border bg-white p-5 md:hidden">
      <div className="flex items-center gap-2">
        <Image
          src={user.image}
          alt={user.name}
          width={80}
          height={80}
          className="max-w-20 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <span
            title={user.name}
            className="mb-0.5 max-w-38 truncate text-base font-medium uppercase"
          >
            {user.name}
          </span>
          <span
            title={user.email}
            className="max-w-38 truncate text-xs font-normal"
          >
            {user.email}
          </span>
        </div>
      </div>

      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon" className="">
            <FiMenu />
            <span className="sr-only">Open profile menu</span>
          </Button>
        </DrawerTrigger>

        <DrawerContent className="">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
            >
              <LuX className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DrawerClose>

          <DrawerTitle className="sr-only">Profile NavMenu Title</DrawerTitle>
          <DrawerDescription className="sr-only">
            Profile NavMenu Description
          </DrawerDescription>

          <div className="flex flex-col items-center justify-between gap-5 py-5">
            {profileNav.map((nav) => (
              <Link
                key={nav.title}
                href={nav.href}
                className="hover:text-primary flex w-full items-center gap-2 px-5 duration-100"
              >
                <nav.icon className="size-5" />
                <span className="text-sm font-medium">{nav.title}</span>
              </Link>
            ))}

            <Button
              variant="ghost"
              className="hover:text-primary flex h-fit w-full items-center justify-start gap-2 rounded-none px-5 py-0 duration-100 hover:bg-transparent"
            >
              <FiLogOut className="size-5!" />
              <span className="text-sm font-medium">Logout</span>
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ProfileMobileMenu;
