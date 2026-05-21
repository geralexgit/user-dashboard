import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { userApi } from './api';

// Mock the API
vi.mock('./api', () => ({
  userApi: {
    getAllUsers: vi.fn(),
    searchUsers: vi.fn(),
  },
}));

const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    age: 30,
    gender: 'male',
    birthDate: '1993-01-01',
    image: 'https://example.com/john.jpg',
    role: 'admin',
    username: 'johndoe',
    bloodGroup: 'A+',
    eyeColor: 'brown',
    hair: {
      color: 'black',
      type: 'straight',
    },
    height: 180,
    weight: 75,
    address: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      stateCode: 'NY',
      postalCode: '10001',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060,
      },
      country: 'USA',
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
        coordinates: {
          lat: 37.7749,
          lng: -122.4194,
        },
        country: 'USA',
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
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+0987654321',
    age: 25,
    gender: 'female',
    birthDate: '1998-05-15',
    image: 'https://example.com/jane.jpg',
    role: 'user',
    username: 'janesmith',
    bloodGroup: 'B+',
    eyeColor: 'blue',
    hair: {
      color: 'blonde',
      type: 'wavy',
    },
    height: 165,
    weight: 60,
    address: {
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      stateCode: 'CA',
      postalCode: '90001',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437,
      },
      country: 'USA',
    },
    company: {
      name: 'Design Studio',
      department: 'Design',
      title: 'UI Designer',
      address: {
        address: '789 Design St',
        city: 'Los Angeles',
        state: 'CA',
        stateCode: 'CA',
        postalCode: '90012',
        coordinates: {
          lat: 34.0522,
          lng: -118.2437,
        },
        country: 'USA',
      },
    },
    bank: {
      cardType: 'Mastercard',
      cardNumber: '9876543210987654',
      cardExpire: '06/24',
      currency: 'USD',
      iban: 'US0987654321',
    },
    university: 'UCLA',
    ip: '192.168.1.2',
    macAddress: 'AA:BB:CC:DD:EE:FF',
    ssn: '987-65-4321',
    ein: '98-7654321',
    crypto: {
      coin: 'Ethereum',
      network: 'Ethereum',
    },
  },
];

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (userApi.getAllUsers as any).mockResolvedValue({
      users: mockUsers,
      total: 2,
    });
  });

  it('renders the app with header', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Users Dashboard')).toBeInTheDocument();
    });
  });

  it('fetches and displays users on load', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(userApi.getAllUsers).toHaveBeenCalledWith(10, 0);
    });
    
    await waitFor(() => {
      // Use getAllByText since there are multiple elements with these names
      expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Jane Smith').length).toBeGreaterThan(0);
    });
  });

  it('shows loading state while fetching users', async () => {
    (userApi.getAllUsers as any).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ users: mockUsers, total: 2 }), 100))
    );
    
    render(<App />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('handles search functionality', async () => {
    (userApi.searchUsers as any).mockResolvedValue({
      users: [mockUsers[0]],
      total: 1,
    });
    
    render(<App />);
    
    const searchInput = screen.getByPlaceholderText('Search users by name...');
    const searchButton = screen.getByText('Search');
    
    fireEvent.change(searchInput, { target: { value: 'John' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(userApi.searchUsers).toHaveBeenCalledWith('John');
    });
  });

  it('handles refresh functionality', async () => {
    render(<App />);
    
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(userApi.getAllUsers).toHaveBeenCalledWith(10, 0);
    });
  });
});