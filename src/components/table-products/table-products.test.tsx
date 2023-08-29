import { render, screen, fireEvent } from '@testing-library/react';
import TableProducts from '.';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('TableProducts component', () => {

  const mockProducts = [
    {
      id: '1',
      logo: 'logo-url',
      name: 'Product 1',
      description: 'Description 1',
      date_release: '2023-01-01',
      date_revision: '2023-01-02',
    }
  ];

  test('renders table with product data', () => {

    render(<TableProducts data={mockProducts} />);

    // Assert that the table is rendered
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    // Assert that the product data is rendered correctly
    const productElements = screen.getAllByRole('row');
    expect(productElements).toHaveLength(mockProducts.length + 1); // +1 for table header row
  });

});
