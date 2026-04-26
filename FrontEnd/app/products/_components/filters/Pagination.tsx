"use client"
import { useFilters } from '../../_hooks/useFilters';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import { useMemo } from 'react';

interface IPagination {
    limit: number;
    total: number;
}
type TPageItem = { type: "page", value: number } | { type: "ellipsis", position: "left" | "right" }


export const Pagination = ({ limit, total }: IPagination) => {
    const { setPage, page } = useFilters()
    const totalPages = Math.ceil(total / limit)

    const PagesToShow = useMemo(() => {
        if (totalPages <= 1) {
            return []
        }
        const pages: TPageItem[] = [];
        const delta = 1;
        const left = Math.max(1, page - delta);
        const right = Math.min(totalPages, page + delta);

        for (let i = left; i <= right; i++) pages.push({ type: 'page', value: i });
        if (left > 2) pages.unshift({ type: 'ellipsis', position: 'left' });
        if (left > 1) pages.unshift({ type: 'page', value: 1 });
        if (right < totalPages - 1) pages.push({ type: 'ellipsis', position: 'right' });
        if (right < totalPages) pages.push({ type: 'page', value: totalPages });
        return pages
    }, [page, totalPages])

    return (
        <div className='flex items-center justify-center my-4 space-x-4'>
            <button onClick={() => setPage(1)} disabled={page === 1} className='cursor-pointer disabled:text-gray-300 text-gray-700' ><BsChevronBarLeft size={26} /></button>
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className='cursor-pointer disabled:text-gray-300 text-gray-700' ><FaAngleLeft size={26} /></button>
            <div>
                {PagesToShow?.map((item) =>
                    item.type === "ellipsis" ? (
                        <span key={`ellipsis-${item.position}`} className="px-1 text-gray-400 text-sm">…</span>
                    ) :
                        <button
                            key={`page-${item.value}`}
                            onClick={() => setPage(item.value)}
                            className={`px-3 py-1 mx-1 rounded ${page === item.value && 'bg-[#02b290] text-white'}  p-4 rounded-full`}
                        >
                            {item.value}
                        </button>
                )}
            </div>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className='cursor-pointer disabled:text-gray-300 text-gray-700' ><FaAngleRight size={26} /></button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className='cursor-pointer disabled:text-gray-300 text-gray-700' ><BsChevronBarRight size={26} /></button>
        </div>
    )
}
