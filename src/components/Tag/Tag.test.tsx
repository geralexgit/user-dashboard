import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tag from './Tag';

describe('Tag', () => {
  it('renders tag with children', () => {
    render(<Tag>Active</Tag>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies gender type class for male', () => {
    const { container } = render(<Tag type="gender" value="male">Male</Tag>);
    const tag = container.querySelector('.tag');
    expect(tag?.className).toContain('tagBlue');
  });

  it('applies gender type class for female', () => {
    const { container } = render(<Tag type="gender" value="female">Female</Tag>);
    const tag = container.querySelector('.tag');
    expect(tag?.className).toContain('tagPink');
  });

  it('applies role type class for admin', () => {
    const { container } = render(<Tag type="role" value="admin">Admin</Tag>);
    const tag = container.querySelector('.tag');
    expect(tag?.className).toContain('tagRed');
  });

  it('applies role type class for moderator', () => {
    const { container } = render(<Tag type="role" value="moderator">Moderator</Tag>);
    const tag = container.querySelector('.tag');
    expect(tag?.className).toContain('tagOrange');
  });

  it('applies default type when not specified', () => {
    const { container } = render(<Tag>Default</Tag>);
    const tag = container.querySelector('.tag');
    expect(tag?.className).toContain('tagBlue');
  });
});