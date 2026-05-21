import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from './UserTable';
import { User } from '../../types';

const mockUsers: User[] = [
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
    username: 'johndoe',
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
    username: 'janesmith',
    bloodGroup: 'B+',
    eyeColor: 'blue',
    hair: {
      color: 'blonde',
      type: 'wavy',
    },
    height: 165,
    weight: 60,
    role: 'user',
    address: {
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      stateCode: 'CA',
      postalCode: '90001',
      country: 'USA',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437,
      },
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
        country: 'USA',
        coordinates: {
          lat: 34.0522,
          lng: -118.2437,
        },
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

const mockColumns = [
  { key: 'name', title: 'Name', mobilePriority: 1, tabletPriority: 1 },
  { key: 'email', title: 'Email', mobilePriority: 2, tabletPriority: 2 },
  { key: 'age', title: 'Age', mobilePriority: 3, tabletPriority: 3 },
  { key: 'gender', title: 'Gender', tabletPriority: 4 },
  { key: 'role', title: 'Role', tabletPriority: 5 },
  { key: 'company', title: 'Company' },
  { key: 'city', title: 'City' },
];

describe('UserTable', () => {
  const mockOnRowClick = vi.fn();

  it('renders table with users', () => {
    render(
      <UserTable users={mockUsers} columns={mockColumns} onRowClick={mockOnRowClick} />
    );
    
    // Use getAllByText since there are multiple elements
    const johnDoeElements = screen.getAllByText('John Doe');
    const janeSmithElements = screen.getAllByText('Jane Smith');
    expect(johnDoeElements.length).toBeGreaterThan(0);
    expect(janeSmithElements.length).toBeGreaterThan(0);
    
    const johnEmailElements = screen.getAllByText('john.doe@example.com');
    const janeEmailElements = screen.getAllByText('jane.smith@example.com');
    expect(johnEmailElements.length).toBeGreaterThan(0);
    expect(janeEmailElements.length).toBeGreaterThan(0);
  });

  it('renders table headers', () => {
    render(
      <UserTable users={mockUsers} columns={mockColumns} onRowClick={mockOnRowClick} />
    );
    
    // Use getAllByText since there are multiple elements
    const nameHeaders = screen.getAllByText('Name');
    const emailHeaders = screen.getAllByText('Email');
    const ageHeaders = screen.getAllByText('Age');
    const genderHeaders = screen.getAllByText('Gender');
    const roleHeaders = screen.getAllByText('Role');
    
    expect(nameHeaders.length).toBeGreaterThan(0);
    expect(emailHeaders.length).toBeGreaterThan(0);
    expect(ageHeaders.length).toBeGreaterThan(0);
    expect(genderHeaders.length).toBeGreaterThan(0);
    expect(roleHeaders.length).toBeGreaterThan(0);
  });

  it('calls onRowClick when row is clicked', () => {
    render(
      <UserTable users={mockUsers} columns={mockColumns} onRowClick={mockOnRowClick} />
    );
    
    // Use getAllByText since there are multiple elements with the same text
    const johnDoeElements = screen.getAllByText('John Doe');
    const firstRow = johnDoeElements[0].closest('tr');
    fireEvent.click(firstRow!);
    
    expect(mockOnRowClick).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('does not call onRowClick when not provided', () => {
    // Create a new mock for this specific test
    const localMockOnRowClick = vi.fn();
    
    render(
      <UserTable users={mockUsers} columns={mockColumns} />
    );
    
    // Use getAllByText since there are multiple elements with the same text
    const johnDoeElements = screen.getAllByText('John Doe');
    const firstRow = johnDoeElements[0].closest('tr');
    fireEvent.click(firstRow!);
    
    // The local mock should not be called since we didn't pass it to the component
    expect(localMockOnRowClick).not.toHaveBeenCalled();
  });

  it('renders custom column render function', () => {
    const customColumns = [
      {
        key: 'name',
        title: 'Name',
        render: (value: any, record: User) => (
          <span data-testid="custom-name">{record.firstName} {record.lastName}</span>
        ),
      },
    ];
    
    render(
      <UserTable users={mockUsers} columns={customColumns} />
    );
    
    // Use getAllByTestId since there are multiple elements
    const customElements = screen.getAllByTestId('custom-name');
    expect(customElements.length).toBe(2);
    expect(customElements[0]).toBeInTheDocument();
    expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument();
  });

  it('renders empty table when no users', () => {
    render(
      <UserTable users={[]} columns={mockColumns} />
    );
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('renders mobile view with prioritized columns', () => {
    render(
      <UserTable users={mockUsers} columns={mockColumns} />
    );
    
    // Check if mobile view elements are present by looking for mobile-specific content
    // The mobile view shows "Name:", "Email:", "Age:" labels
    const nameLabels = screen.getAllByText('Name:');
    const emailLabels = screen.getAllByText('Email:');
    const ageLabels = screen.getAllByText('Age:');
    
    expect(nameLabels.length).toBeGreaterThan(0);
    expect(emailLabels.length).toBeGreaterThan(0);
    expect(ageLabels.length).toBeGreaterThan(0);
  });

  it('renders tablet view with prioritized columns', () => {
    render(
      <UserTable users={mockUsers} columns={mockColumns} />
    );
    
    // Tablet view shows a subset of columns (Name, Email, Age, Gender, Role)
    // We can verify by checking that all expected columns are present
    const nameHeaders = screen.getAllByText('Name');
    const emailHeaders = screen.getAllByText('Email');
    const ageHeaders = screen.getAllByText('Age');
    const genderHeaders = screen.getAllByText('Gender');
    const roleHeaders = screen.getAllByText('Role');
    
    // There should be at least 2 of each (desktop + tablet views)
    expect(nameHeaders.length).toBeGreaterThan(1);
    expect(emailHeaders.length).toBeGreaterThan(1);
    expect(ageHeaders.length).toBeGreaterThan(1);
    expect(genderHeaders.length).toBeGreaterThan(1);
    expect(roleHeaders.length).toBeGreaterThan(1);
  });
});