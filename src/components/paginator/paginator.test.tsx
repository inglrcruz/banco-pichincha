import { render, fireEvent } from '@testing-library/react';
import Paginator from './';

describe('Paginator', () => {

    test('should call onPageChange with the correct start and end indexes when a page number is clicked', () => {
        const totalItems = 50;
        const itemsPerPage = 10;
        const onPageChange = jest.fn();

        const { getByText } = render(
            <Paginator totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />
        );

        fireEvent.click(getByText('Siguiente'));
        expect(onPageChange).toHaveBeenCalledWith(10, 20);
    });

    test('should disable the "Anterior" button when on the first page', () => {
        const totalItems = 50;
        const itemsPerPage = 10;
        const onPageChange = jest.fn();

        const { getByText } = render(
            <Paginator totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />
        );

        const previousButton = getByText('Anterior');
        expect(previousButton).toBeDisabled();
    });

    test('should disable the "Siguiente" button when on the last page', () => {
        const totalItems = 10;
        const itemsPerPage = 10;
        const onPageChange = jest.fn();

        const { getByText } = render(
            <Paginator totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />
        );

        const totalPages = Math.ceil(totalItems / itemsPerPage);
        fireEvent.click(getByText(`Página ${totalPages} de ${totalPages}`));
        const nextButton = getByText('Siguiente');
        expect(nextButton).toBeDisabled();
    });
});
