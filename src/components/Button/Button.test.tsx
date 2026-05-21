import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies primary styles when type is primary', () => {
    const { container } = render(
      <Button type="primary">Primary Button</Button>
    );
    
    const button = container.querySelector('button');
    expect(button?.className).toContain('primaryButton');
  });

  it('applies default styles when type is default', () => {
    const { container } = render(
      <Button type="default">Default Button</Button>
    );
    
    const button = container.querySelector('button');
    expect(button?.className).toContain('defaultButton');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Button className="custom-class">Button</Button>
    );
    
    const button = container.querySelector('button');
    expect(button?.className).toContain('custom-class');
  });
});