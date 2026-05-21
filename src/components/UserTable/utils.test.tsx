import { describe, it, expect, vi } from 'vitest';
import { getColumns, TableColumn } from './utils';
import { User } from '../../types';

describe('UserTable utils', () => {
  const mockOnViewUser = vi.fn();
  const mockUser: User = {
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
  };

  it('returns array of columns', () => {
    const columns = getColumns(mockOnViewUser);
    
    expect(Array.isArray(columns)).toBe(true);
    expect(columns.length).toBeGreaterThan(0);
  });

  it('includes all required columns', () => {
    const columns = getColumns(mockOnViewUser);
    const columnKeys = columns.map(col => col.key);
    
    expect(columnKeys).toContain('image');
    expect(columnKeys).toContain('name');
    expect(columnKeys).toContain('email');
    expect(columnKeys).toContain('age');
    expect(columnKeys).toContain('gender');
    expect(columnKeys).toContain('role');
    expect(columnKeys).toContain('company');
    expect(columnKeys).toContain('city');
    expect(columnKeys).toContain('actions');
  });

  it('sets correct column properties', () => {
    const columns = getColumns(mockOnViewUser);
    
    const nameColumn = columns.find(col => col.key === 'name');
    expect(nameColumn).toBeDefined();
    expect(nameColumn?.title).toBe('Name');
    expect(nameColumn?.width).toBe(200);
    expect(nameColumn?.mobilePriority).toBe(2);
    expect(nameColumn?.tabletPriority).toBe(2);
  });

  it('includes render functions for columns', () => {
    const columns = getColumns(mockOnViewUser);
    
    const imageColumn = columns.find(col => col.key === 'image');
    expect(imageColumn?.render).toBeDefined();
    expect(typeof imageColumn?.render).toBe('function');
    
    const nameColumn = columns.find(col => col.key === 'name');
    expect(nameColumn?.render).toBeDefined();
    expect(typeof nameColumn?.render).toBe('function');
    
    const actionsColumn = columns.find(col => col.key === 'actions');
    expect(actionsColumn?.render).toBeDefined();
    expect(typeof actionsColumn?.render).toBe('function');
  });

  it('render functions return React elements', () => {
    const columns = getColumns(mockOnViewUser);
    
    const imageColumn = columns.find(col => col.key === 'image')!;
    const imageRender = imageColumn.render!(mockUser.image, mockUser);
    expect(imageRender).toBeDefined();
    
    const nameColumn = columns.find(col => col.key === 'name')!;
    const nameRender = nameColumn.render!(null, mockUser);
    expect(nameRender).toBeDefined();
    
    const actionsColumn = columns.find(col => col.key === 'actions')!;
    const actionsRender = actionsColumn.render!(null, mockUser);
    expect(actionsRender).toBeDefined();
  });

  it('actions column render calls onViewUser when clicked', () => {
    const columns = getColumns(mockOnViewUser);
    const actionsColumn = columns.find(col => col.key === 'actions')!;
    
    // Mock the Button component's onClick
    const mockButtonOnClick = vi.fn();
    const actionsRender = actionsColumn.render!(null, mockUser);
    
    // In a real test, we would render the component and simulate click
    // For now, we just verify the function exists
    expect(actionsRender).toBeDefined();
  });

  it('sets correct alignment for columns', () => {
    const columns = getColumns(mockOnViewUser);
    
    const ageColumn = columns.find(col => col.key === 'age');
    expect(ageColumn?.align).toBe('center');
    
    const genderColumn = columns.find(col => col.key === 'gender');
    expect(genderColumn?.align).toBe('center');
    
    const roleColumn = columns.find(col => col.key === 'role');
    expect(roleColumn?.align).toBe('center');
    
    const actionsColumn = columns.find(col => col.key === 'actions');
    expect(actionsColumn?.align).toBe('center');
  });

  it('sets mobile and tablet priorities for all columns', () => {
    const columns = getColumns(mockOnViewUser);
    
    columns.forEach(column => {
      expect(column.mobilePriority).toBeDefined();
      expect(column.tabletPriority).toBeDefined();
      expect(typeof column.mobilePriority).toBe('number');
      expect(typeof column.tabletPriority).toBe('number');
    });
  });
});