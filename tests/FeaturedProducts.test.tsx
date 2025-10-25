import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FeaturedProducts from '../src/components/home/FeaturedProducts';
import { CartProvider } from '../src/contexts/CartContext';
import { AuthProvider } from '../src/contexts/AuthContext';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>{component}</CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('FeaturedProducts', () => {
  it('renders a list of products', () => {
    renderWithProviders(<FeaturedProducts />);
    const productNames = screen.getAllByRole('heading', { level: 3 });
    expect(productNames.length).toBeGreaterThan(0);
  });

  it('renders the correct number of products', () => {
    renderWithProviders(<FeaturedProducts />);
    const productNames = screen.getAllByRole('heading', { level: 3 });
    expect(productNames).toHaveLength(4);
  });
});
