import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('renders the navigation brand name', () => {
  render(<App />);
  const brandName = screen.getByText(/Hubert de Tournay/i);
  expect(brandName).toBeInTheDocument();
});