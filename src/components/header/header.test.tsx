import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './';

test('renders header component', () => {
  const { getByAltText } = render(
    <Router>
      <Header />
    </Router>
  );

  const logo = getByAltText('Logo Pichincha');

  expect(logo).toBeInTheDocument();
});
