import { useEffect, useState } from 'react';
import './style.scss'
import { PaginatorProps } from '../../interfaces/paginatorInterface'

const Paginator = ({ totalItems, itemsPerPage, onPageChange }: PaginatorProps) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [startIndex, setStartIndex] = useState<number>(0)

    // It sets the current page to the first page and the start index to zero, ensuring pagination consistency.
    useEffect(() => {
        setCurrentPage(1)
        setStartIndex(0)
    }, [itemsPerPage, totalItems])

    /**
     * Change in the current page when a user clicks on a page number.
     * @param pageNumber 
     */
    const handlePageChange = (pageNumber: number) => {
        const startIdx: number = (pageNumber > currentPage) ? startIndex + itemsPerPage : startIndex - itemsPerPage
        const endIndex = (startIdx > 0) ? startIdx + itemsPerPage : itemsPerPage
        setStartIndex(startIdx)
        onPageChange(startIdx, endIndex)
        setCurrentPage(pageNumber)
    }

    return (
        <div id="paginator">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        </div>
    )
}

export default Paginator