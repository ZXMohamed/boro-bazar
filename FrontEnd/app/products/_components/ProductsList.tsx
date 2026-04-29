import { BuildQuery } from '../_lib/BuildQuery'
import { TSearchParams } from '../_types/type.products'
import { Pagination } from './filters/Pagination'
import { SortingFilter } from './filters/SortingFilter'
import { ProductListSkelton } from './skelton/ProductListSkelton'



export const ProductsList = async ({ searchParams }: { searchParams: TSearchParams }) => {
  const query = BuildQuery(searchParams)
  console.log('query', query)

  return (
    <div>
      <SortingFilter />
      <ProductListSkelton />
      <Pagination limit={10} total={100} />
    </div>
  )
}
