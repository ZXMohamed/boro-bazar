"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFilters } from '../../_hooks/useFilters'

export const SortingFilter = () => {
    const selectOptions = [
        { label: 'Name A to Z', value: 'asc' },
        { label: 'Name Z to A', value: 'desc' },
        { label: 'Price Low to High', value: 'lowToHigh' },
        { label: 'Price High to Low', value: 'highToLow' },
    ]
    const {setSort} = useFilters()
    return (
        <div className='bg-[#f1f1f1] p-2 flex justify-between items-center rounded-md'>
            <p className='text-3'>There are 22 products </p>
            <div className='flex items-center gap-1'>
                <span>Sort by :</span>
                <Select onValueChange={(value) => setSort(value)} defaultValue={selectOptions[0].value}>
                    <SelectTrigger  className='bg-white rounded-md'>
                        <SelectValue placeholder={`${selectOptions[0].label}`} />
                    </SelectTrigger>
                    <SelectContent className='' >
                        {
                            selectOptions.map((option) => (
                                <SelectItem  key={option.value}
                                value={option.value} >
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
