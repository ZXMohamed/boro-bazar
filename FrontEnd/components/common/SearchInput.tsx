"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Input } from "../ui/input";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      router.push(`/shop?search=${encodeURIComponent(value)}`);
      setValue("");
    }
  };

  return (
    <div className="relative">
      <Input
        type="search"
        value={value}
        onKeyDown={handleSearch}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for products..."
        className={cn(
          "hover:border-primary/50 focus:border-primary focus:ring-primary/30 border-[#E6E6E6] bg-[#F6F6F6] px-5 transition-colors duration-200 focus:ring-1",
        )}
        aria-label="Search products"
      />

      {value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 focus:outline-none"
          aria-label="Clear search"
        >
          <IoClose className="size-5" />
        </button>
      ) : (
        <IoSearchOutline className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2" />
      )}
    </div>
  );
};

export default SearchInput;
