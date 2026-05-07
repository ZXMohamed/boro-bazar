"use client"
import { useState } from 'react'
import { TProductDetails } from '../_types/productDetails.type'

const ProductImages = ({ product }: { product: TProductDetails }) => {
    const [image, setImage] = useState<string>(product.images[0])
    return (
        <div className='flex flex-col space-y-5 '>
            <div className='w-[374px] h-[395px]  border border-[#C1C1C1] '>
                <img  src={image} alt={product.title} className='w-[349.7px] h-[349.7px] object-contain  mx-auto' />
            </div>

            <div className='grid w-[374px] grid-cols-5 justify-evenly gap-1'>
                {
                    product.images.map((image, index) => (
                        <div key={index} className='w-[70.76px] h-[84px] border border-[#C1C1C1]'>
                            <img className='w-[66.17px] h-[66.17px]' onClick={() => setImage(image)} src={image} alt={product.title} />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default ProductImages