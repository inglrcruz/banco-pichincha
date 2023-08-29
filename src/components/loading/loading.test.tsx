import { render, screen } from '@testing-library/react';
import Loading from './';

describe('Loading component', () => {
  test('renders loading message', () => {
    render(<Loading />);
    
    const loadingMessage = screen.getByText(/Cargando, espere.../i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
