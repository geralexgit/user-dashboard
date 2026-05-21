import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders header with title', () => {
    render(<Header totalUsers={100} />);
    expect(screen.getByText('User Dashboard')).toBeInTheDocument();
  });

  it('displays total users count', () => {
    render(<Header totalUsers={100} />);
    expect(screen.getByText('Total Users: 100')).toBeInTheDocument();
  });

  it('displays different total users count', () => {
    render(<Header totalUsers={50} />);
    expect(screen.getByText('Total Users: 50')).toBeInTheDocument();
  });

  it('renders logo icon', () => {
    render(<Header totalUsers={100} />);
    // Check that the logo icon emoji is present
    expect(screen.getByText('👤')).toBeInTheDocument();
  });
});