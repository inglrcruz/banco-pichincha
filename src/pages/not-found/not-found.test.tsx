import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './';

test('renders NotFound component', () => {
    render(
        <BrowserRouter>
            <NotFound />
        </BrowserRouter>
    );

    // Assert that the component renders without throwing an error
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Houston, tenemos un problema...')).toBeInTheDocument();
    expect(screen.getByText('La página no ha sido encontrada.')).toBeInTheDocument();
    expect(screen.getByText('Ir a la página principal')).toBeInTheDocument();
});
