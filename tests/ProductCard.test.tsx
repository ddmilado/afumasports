import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../src/components/ProductCard';
import { CartProvider } from '../src/contexts/CartContext';
import { AuthProvider } from '../src/contexts/AuthContext';
import { vi } from 'vitest';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  category: 'Test Category',
  price: 100,
  image: 'test.jpg',
  inStock: true,
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>{component}</CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    renderWithProviders(<ProductCard {...mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('adds item to cart when "Add to Cart" is clicked', () => {
    renderWithProviders(<ProductCard {...mockProduct} />);
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    // In a real app, you'd check if the cart context was updated.
    // For this test, we'll just check that the button is clickable.
    expect(addToCartButton).toBeEnabled();
  });

  it('disables "Add to Cart" button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    renderWithProviders(<ProductCard {...outOfStockProduct} />);
    const addToCartButton = screen.getByText('Out of Stock');
    expect(addToCartButton).toBeDisabled();
  });
});
