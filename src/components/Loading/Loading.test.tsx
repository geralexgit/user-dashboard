import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  it('renders loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading spinner', () => {
    const { container } = render(<Loading />);
    // The spinner has a class from CSS modules, we need to check if the element exists
    // by looking for the div with the loading class structure
    const loadingDiv = container.querySelector('[class*="loading"]');
    expect(loadingDiv).toBeInTheDocument();
  });
});