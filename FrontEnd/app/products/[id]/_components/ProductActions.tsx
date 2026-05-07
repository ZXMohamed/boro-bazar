"use client";
import { CiHeart } from "react-icons/ci";

import { useState } from "react";
import { FaChevronUp, FaChevronDown, FaHeart } from "react-icons/fa";

export default function ProductActions({ stock = 0 }: { stock?: number }) {
    const [quantity, setQuantity] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };
    if (stock === 0 || null || undefined) {
        return <p className="text-red-600 text-lg font-medium" >out of Stock</p>
    }
    return (
        <div className="flex items-center gap-2.5">

            {/* Quantity */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10 w-[76px]">
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(stock, Math.max(1, +e.target.value)))}
                    className="w-[42px] h-full text-center text-sm outline-none border-none [appearance:textfield]"
                    min={1}
                    max={stock}
                />
                <div className="flex flex-col border-l border-gray-300 h-full">
                    <button
                        onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                        className="flex-1 w-6 flex items-center justify-center text-[9px] text-gray-500 hover:bg-gray-100 border-b border-gray-300"
                    >
                        <FaChevronUp />
                    </button>
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex-1 w-6 flex items-center justify-center text-[9px] text-gray-500 hover:bg-gray-100"
                    >
                        <FaChevronDown />
                    </button>
                </div>
            </div>

            {/* Add to Cart */}
            <button
                onClick={handleAddToCart}
                className={`h-10 px-5 rounded-md text-white text-sm font-semibold flex items-center gap-2 transition-colors ${added ? "bg-teal-800" : "bg-[#0BAA8A] hover:bg-teal-600"
                    }`}
            >
                {/* <ShoppingCart size={16} /> */}
                {added ? "✓ Added!" : "Add to Cart"}
            </button>

            {/* Wishlist */}
            <button
                onClick={() => setWishlisted((w) => !w)}
                className="border border-gray-400 rounded-md h-full px-2"
            >
                {
                    wishlisted ? (
                        <FaHeart className="text-red-500 5"  />
                    ) : (
                        <CiHeart className="text-5" />
                    )
                }
                
            </button>

        </div>
    );
}