import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuHeart, LuMapPin, LuUserRound } from "react-icons/lu";

const profileNav = [
  { icon: LuUserRound, title: "My Profile", href: "/my-profile" },
  { icon: LuMapPin, title: "Address", href: "/address" },
  { icon: LuHeart, title: "My List", href: "/my-list" },
  { icon: HiOutlineShoppingBag, title: "My Orders", href: "/my-orders" },
];

const user = {
  name: "Hambozo Elbozo",
  email: "Hambozo_Elbozo@gmail.com",
  image: "/userImg.png",
};

const ProfileMenu = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white px-5 py-7 text-center">
        <Image
          loading="eager"
          src={user.image}
          alt={user.name}
          width={110}
          height={110}
        />
        <span
          title={user.name}
          className="mb-0.5 truncate font-medium uppercase md:max-w-30 md:text-sm lg:max-w-48 lg:text-base"
        >
          {user.name}
        </span>
        <span
          title={user.email}
          className="truncate text-xs font-normal md:max-w-30 lg:max-w-48"
        >
          {user.email}
        </span>
      </div>
      <div className="space-y-4 bg-[#F5F5F5] py-5">
        {profileNav.map((nav) => (
          <Link
            href={nav.href}
            key={nav.title}
            className="hover:text-primary hover:border-primary flex items-center gap-2 border-l-4 border-transparent px-5 duration-100"
          >
            <nav.icon className="md:size-4 lg:size-5" />
            <span className="font-medium md:text-xs lg:text-sm">
              {nav.title}
            </span>
          </Link>
        ))}
        <Button
          variant="ghost"
          className="hover:text-primary hover:border-primary flex h-fit w-full items-center justify-start gap-2 rounded-none border-l-4 border-transparent px-5 py-0 duration-100"
        >
          <FiLogOut className="md:size-4! lg:size-5!" />
          <span className="font-medium md:text-xs lg:text-sm">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileMenu;
