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
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});