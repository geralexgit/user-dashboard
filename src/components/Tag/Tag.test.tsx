import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tag from './Tag';

describe('Tag', () => {
  it('renders tag with children', () => {
    render(<Tag>Active</Tag>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies gender type class for male', () => {
    render(<Tag type="gender" value="male">Male</Tag>);
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('applies gender type class for female', () => {
    render(<Tag type="gender" value="female">Female</Tag>);
    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  it('applies role type class for admin', () => {
    render(<Tag type="role" value="admin">Admin</Tag>);
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('applies role type class for moderator', () => {
    render(<Tag type="role" value="moderator">Moderator</Tag>);
    expect(screen.getByText('Moderator')).toBeInTheDocument();
  });

  it('applies default type when not specified', () => {
    render(<Tag>Default</Tag>);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });
});