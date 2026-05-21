import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();
  const mockOnRefresh = vi.fn();
  const mockOnSearchInputChange = vi.fn();
  const mockOnSearchKeyDown = vi.fn();

  const defaultProps = {
    searchQuery: '',
    onSearch: mockOnSearch,
    onRefresh: mockOnRefresh,
    onSearchInputChange: mockOnSearchInputChange,
    onSearchKeyDown: mockOnSearchKeyDown,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and buttons', () => {
    render(<SearchBar {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Search users by name...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('displays search query in input', () => {
    render(<SearchBar {...defaultProps} searchQuery="John" />);
    
    const input = screen.getByPlaceholderText('Search users by name...');
    expect(input).toHaveValue('John');
  });

  it('calls onSearchInputChange when input changes', () => {
    render(<SearchBar {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Search users by name...');
    fireEvent.change(input, { target: { value: 'Jane' } });
    
    expect(mockOnSearchInputChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSearchKeyDown when key is pressed', () => {
    render(<SearchBar {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Search users by name...');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnSearchKeyDown).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when search button is clicked', () => {
    render(<SearchBar {...defaultProps} />);
    
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onRefresh when reset button is clicked', () => {
    render(<SearchBar {...defaultProps} />);
    
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });
});