"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BuildQuery } from "../_lib/BuildQuery"

export const useFilters = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const allCategories = searchParams.getAll("category")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const allRating = searchParams.getAll("rating")
    const sort = searchParams.get("sort")
   const page = Number(searchParams.get("page") || 1)


    const updateCategory = (slug: string) => {
        const selected = allCategories.includes(slug)
            ? allCategories.filter(s => s !== slug)
            : [...allCategories, slug]

        const newUrl = BuildQuery({
            category: selected,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            rating: allRating,
            sort: sort || undefined,
            page: '1'
        })

        router.push(`${pathname}?${newUrl}`)
    }


    const setPrice = (value: number[]) => {
        const newUrl = BuildQuery({
            category: allCategories,
            minPrice: value[0].toString(),
            maxPrice: value[1].toString(),
            rating: allRating,
            sort: sort || undefined,
            page: '1'
        })

        router.push(`${pathname}?${newUrl}`)

    }

    const setRating = (value: string) => {

        const selected = allRating.includes(value)
            ? allRating.filter(s => s !== value)
            : [...allRating, value]
       const newUrl = BuildQuery({
            category: allCategories,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            rating: selected,
            sort: sort || undefined,
            page: '1'
        })
        router.push(`${pathname}?${newUrl}`)
    }

    const setPage = (value: number) => {
        const newUrl = BuildQuery({
            category: allCategories,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            rating: allRating,
            sort: sort || undefined,
            page: value.toString()
        })

        router.push(`${pathname}?${newUrl}`)
    }
    const setSort = (value: string) => {
        const newUrl = BuildQuery({
            category: allCategories,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            rating: allRating,
            sort: value,
            page: '1'
        })
        router.push(`${pathname}?${newUrl}`)
    }

    const clearFilters = () => router.push(pathname)

    return {
        allCategories,
        minPrice,
        maxPrice,
        allRating,
        sort,
        page,
        updateCategory,
        setPrice,
        setRating,
        setPage,
        clearFilters,
        setSort
    }
}