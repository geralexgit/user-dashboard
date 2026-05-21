import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();
  const mockOnPageSizeChange = vi.fn();

  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    pageSize: 10,
    total: 50,
    onPageChange: mockOnPageChange,
    onPageSizeChange: mockOnPageSizeChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pagination with page info', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    expect(screen.getByText('Showing 1-10 of 50 users')).toBeInTheDocument();
  });

  it('renders previous and next buttons', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when previous button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('renders page size selector', () => {
    render(<Pagination {...defaultProps} />);
    
    // Find the select by its role
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('10');
  });

  it('calls onPageSizeChange when page size is changed', () => {
    render(<Pagination {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '20' } });
    
    expect(mockOnPageSizeChange).toHaveBeenCalled();
  });

  it('shows correct page size options', () => {
    render(<Pagination {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('10');
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveValue('10');
    expect(options[1]).toHaveValue('20');
    expect(options[2]).toHaveValue('30');
    expect(options[3]).toHaveValue('50');
  });
});