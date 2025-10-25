import { render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import Carousel from '../src/components/home/Carousel';

describe('Carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the first slide initially', () => {
    render(<Carousel />);
    expect(screen.getByText('Performance Meets Style')).toBeInTheDocument();
  });

  it('advances to the next slide automatically', () => {
    render(<Carousel />);
    expect(screen.getByText('Performance Meets Style')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText('Engineered for Excellence')).toBeInTheDocument();
  });

  it('loops back to the first slide', () => {
    render(<Carousel />);
    
    act(() => {
      vi.advanceTimersByTime(5000); // to slide 2
      vi.advanceTimersByTime(5000); // to slide 3
      vi.advanceTimersByTime(5000); // back to slide 1
    });

    expect(screen.getByText('Performance Meets Style')).toBeInTheDocument();
  });
});
