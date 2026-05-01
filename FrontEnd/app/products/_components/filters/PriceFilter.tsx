"use client"
import { Slider } from '@/components/ui/slider'
import HeadingProductsSidebar from './HeadingProductsSidebar'
import { useFilters } from '../../_hooks/useFilters'

export const PriceFilter = () => {
    const { minPrice, maxPrice, setPrice } = useFilters()
    return (
        <div className='flex flex-col space-y-3'>
            <HeadingProductsSidebar title='Filter By Price' />

            <Slider
                value={[Number(minPrice) || 0, Number(maxPrice) || 1000]}
                max={1000}
                min={0}
                step={1}
                onValueChange={(value) => setPrice(value)}
                className="mx-auto w-full max-w-xs forced-colors:invert[#02B290]"
            />
        </div>
    )
}
