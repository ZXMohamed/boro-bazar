import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton'

export const ProductListSkelton = () => {
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {Array.from({ length: 12 }).map((_, idx) => (
                    <ProductCardSkeleton key={idx} />
                ))}
            </div>
        </>
    )
}
