import React from 'react'
import { TProductDetails } from '../_types/productDetails.type'
import StarRating from '../../_components/filters/StarRating'
import { FaStar } from 'react-icons/fa'
import Rate from '@/components/common/Rate'
import ProductActions from './ProductActions'

const ProductDetail = ({ product }: { product: TProductDetails }) => {
  return (
    <div className='flex flex-col space-y-5'>
      <h2 className="text-[24px] font-bold leading-[36px]">{product.title}</h2>
      <div className='flex items-center space-x-2'>
        <h5 className='text-sm font-300 text-gray-600'>Brand:</h5>
        <h5 className='text-sm font-300 text-gray-600'>{product.brand}</h5>
        <div className="flex items-center gap-1 mx-4">
          {Array.from({ length: product.rating }).map((_, i) => (
            <FaStar key={`star-${i}`} className="text-yellow-400" />
          ))}
        </div>
        <p className='text-sm  font-300'>
          Review({product.reviews.length})
        </p>
      </div>
      <div className='flex space-x-3'>
        <h6 className='text-[20px] font-bold leading-[22px] text-[#CB0000]'> ${product.price}</h6>
        <h6 className='text-[20px] font-bold leading-[22px] text-[#A4A4A4]'> ${product.price}</h6>
        <p className='text-sm font-300'>Available In Stock: <span className='text-[#399C46] font-bold '>{product.stock} Item</span></p>
      </div>
      <p className='text-[15px] leading-[30px]'>{product.description}</p>
      <ProductActions stock={product.stock} />
    </div>
  )
}

export default ProductDetail