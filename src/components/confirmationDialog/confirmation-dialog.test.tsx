import { render, fireEvent } from '@testing-library/react';
import ConfirmationDialog from './index';

describe('ConfirmationDialog Component', () => {
    it('renders correctly with title and message', () => {
      const { getByText } = render(
        <ConfirmationDialog
          title="Confirmation Title"
          message="Confirmation Message"
          onConfirm={() => {}}
        />
      );
  
      expect(getByText('Confirmation Title')).toBeInTheDocument();
      expect(getByText('Confirmation Message')).toBeInTheDocument();
    });
  
    it('calls onConfirm when confirm button is clicked', () => {
      const mockOnConfirm = jest.fn();
  
      const { getByText } = render(
        <ConfirmationDialog
          title="Confirmation Title"
          message="Confirmation Message"
          onConfirm={mockOnConfirm}
        />
      );
  
      const confirmButton = getByText('Aceptar');
      fireEvent.click(confirmButton);
  
      expect(mockOnConfirm).toHaveBeenCalled();
    });
  
    it('calls onCancel when cancel button is clicked', () => {
      const mockOnCancel = jest.fn();
  
      const { getByText } = render(
        <ConfirmationDialog
          title="Confirmation Title"
          message="Confirmation Message"
          onConfirm={() => {}}
          onCancel={mockOnCancel}
        />
      );
  
      const cancelButton = getByText('Cancelar');
      fireEvent.click(cancelButton);
  
      expect(mockOnCancel).toHaveBeenCalled();
    });
  });
  