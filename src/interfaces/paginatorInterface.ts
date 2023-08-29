export interface PaginatorProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (startIndex: number, endIndex: number) => void;
}