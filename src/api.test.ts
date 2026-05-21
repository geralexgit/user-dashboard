import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { userApi } from './api';
import { UsersResponse, User } from './types';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUsersResponse: UsersResponse = {
  users: [
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
  ],
  total: 1,
  skip: 0,
  limit: 30,
};

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

describe('userApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('fetches all users with default parameters', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUsersResponse });

      const result = await userApi.getAllUsers();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/users?limit=30&skip=0'
      );
      expect(result).toEqual(mockUsersResponse);
    });

    it('fetches all users with custom parameters', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUsersResponse });

      const result = await userApi.getAllUsers(10, 20);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/users?limit=10&skip=20'
      );
      expect(result).toEqual(mockUsersResponse);
    });

    it('handles API errors', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValue(error);

      await expect(userApi.getAllUsers()).rejects.toThrow('Network error');
    });
  });

  describe('searchUsers', () => {
    it('searches users with query', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUsersResponse });

      const result = await userApi.searchUsers('John');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/users/search?q=John'
      );
      expect(result).toEqual(mockUsersResponse);
    });

    it('handles search API errors', async () => {
      const error = new Error('Search failed');
      mockedAxios.get.mockRejectedValue(error);

      await expect(userApi.searchUsers('John')).rejects.toThrow('Search failed');
    });
  });

  describe('getUserById', () => {
    it('fetches user by id', async () => {
      mockedAxios.get.mockResolvedValue({ data: mockUser });

      const result = await userApi.getUserById(1);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://dummyjson.com/users/1'
      );
      expect(result).toEqual(mockUser);
    });

    it('handles user not found', async () => {
      const error = new Error('User not found');
      mockedAxios.get.mockRejectedValue(error);

      await expect(userApi.getUserById(999)).rejects.toThrow('User not found');
    });
  });
});