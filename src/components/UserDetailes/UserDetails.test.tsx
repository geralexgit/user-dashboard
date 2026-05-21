import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserDetails from './UserDetails';
import { User } from '../../types';

const mockUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  maidenName: 'Smith',
  age: 30,
  gender: 'male',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  username: 'johndoe',
  birthDate: '1993-01-01',
  image: 'https://example.com/john.jpg',
  bloodGroup: 'A+',
  eyeColor: 'brown',
  hair: {
    color: 'black',
    type: 'straight',
  },
  height: 180,
  weight: 75,
  role: 'admin',
  address: {
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    stateCode: 'NY',
    postalCode: '10001',
    country: 'USA',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
  },
  company: {
    name: 'Tech Corp',
    department: 'Engineering',
    title: 'Senior Developer',
    address: {
      address: '456 Tech Ave',
      city: 'San Francisco',
      state: 'CA',
      stateCode: 'CA',
      postalCode: '94107',
      country: 'USA',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
  },
  bank: {
    cardType: 'Visa',
    cardNumber: '1234567890123456',
    cardExpire: '12/25',
    currency: 'USD',
    iban: 'US1234567890',
  },
  university: 'MIT',
  ip: '192.168.1.1',
  macAddress: '00:11:22:33:44:55',
  ssn: '123-45-6789',
  ein: '12-3456789',
  crypto: {
    coin: 'Bitcoin',
    network: 'Bitcoin',
  },
};

describe('UserDetails', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when visible is false', () => {
    render(
      <UserDetails user={mockUser} visible={false} onClose={mockOnClose} />
    );
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('does not render when user is null', () => {
    render(
      <UserDetails user={null} visible={true} onClose={mockOnClose} />
    );
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('renders user details when visible and user is provided', () => {
    render(
      <UserDetails user={mockUser} visible={true} onClose={mockOnClose} />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <UserDetails user={mockUser} visible={true} onClose={mockOnClose} />
    );
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    render(
      <UserDetails user={mockUser} visible={true} onClose={mockOnClose} />
    );
    
    // The overlay doesn't have a role="dialog", so we need to find it differently
    // Look for the modal overlay div
    const overlay = document.querySelector('.modalOverlay');
    fireEvent.click(overlay!);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    render(
      <UserDetails user={mockUser} visible={true} onClose={mockOnClose} />
    );
    
    // Click on the modal content (not the overlay)
    const modalContent = screen.getByText('Personal Information');
    fireEvent.click(modalContent);
    
    // The mock might have been called from previous tests, so we need to check
    // that it wasn't called from THIS click
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('displays user personal information', () => {
    render(
      <UserDetails user={mockUser} visible={true} onClose={mockOnClose} />
    );
    
    // Use getAllByText since there might be multiple elements
    const fullNameElements = screen.getAllByText('Full Name');
    // The component shows "John (Smith) Doe" not "John Smith Doe"
    const johnSmithDoeElements = screen.getAllByText('John (Smith) Doe');
    const ageElements = screen.getAllByText('30 years');
    const genderElements = screen.getAllByText('male');
    
    expect(fullNameElements.length).toBeGreaterThan(0);
    expect(johnSmithDoeElements.length).toBeGreaterThan(0);
    expect(ageElements.length).toBeGreaterThan(0);
    expect(genderElements.length).toBeGreaterThan(0);
  });

  it('displays user address information', () => {
    render(
      <UserDetails user={mockUser} visible={true} onClose={mockOnClose} />
    );
    
    // Use getAllByText since there might be multiple elements
    const streetElements = screen.getAllByText('Street');
    const addressElements = screen.getAllByText('123 Main St');
    const cityStateElements = screen.getAllByText('New York, NY (NY)');
    
    expect(streetElements.length).toBeGreaterThan(0);
    expect(addressElements.length).toBeGreaterThan(0);
    expect(cityStateElements.length).toBeGreaterThan(0);
  });

  it('displays user company information', () => {
    render(
      <UserDetails user={mockUser} visible={true} onClose={mockOnClose} />
    );
    
    // Use getAllByText since there might be multiple elements
    const companyElements = screen.getAllByText('Company');
    const techCorpElements = screen.getAllByText('Tech Corp');
    const engineeringElements = screen.getAllByText('Engineering');
    
    expect(companyElements.length).toBeGreaterThan(0);
    expect(techCorpElements.length).toBeGreaterThan(0);
    expect(engineeringElements.length).toBeGreaterThan(0);
  });
});