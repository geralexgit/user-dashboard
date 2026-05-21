import { describe, it, expect } from 'vitest';
import { User, UsersResponse } from './types';

describe('TypeScript types', () => {
  describe('User interface', () => {
    it('has correct structure', () => {
      const user: User = {
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
        height: 180,
        weight: 75,
        eyeColor: 'brown',
        hair: {
          color: 'black',
          type: 'straight',
        },
        ip: '192.168.1.1',
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
        macAddress: '00:11:22:33:44:55',
        university: 'MIT',
        bank: {
          cardExpire: '12/25',
          cardNumber: '1234567890123456',
          cardType: 'Visa',
          currency: 'USD',
          iban: 'US1234567890',
        },
        company: {
          department: 'Engineering',
          name: 'Tech Corp',
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
        ein: '12-3456789',
        ssn: '123-45-6789',
        userAgent: 'Mozilla/5.0',
        crypto: {
          coin: 'Bitcoin',
          wallet: '0x1234567890abcdef',
          network: 'Bitcoin',
        },
        role: 'admin',
      };

      expect(user.id).toBe(1);
      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
      expect(user.email).toBe('john.doe@example.com');
      expect(user.age).toBe(30);
      expect(user.gender).toBe('male');
      expect(user.address.city).toBe('New York');
      expect(user.company.name).toBe('Tech Corp');
      expect(user.bank.cardType).toBe('Visa');
      expect(user.role).toBe('admin');
    });

    it('has required nested objects', () => {
      const user: User = {
        id: 1,
        firstName: 'Jane',
        lastName: 'Smith',
        maidenName: '',
        age: 25,
        gender: 'female',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
        username: 'janesmith',
        birthDate: '1998-05-15',
        image: 'https://example.com/jane.jpg',
        bloodGroup: 'B+',
        height: 165,
        weight: 60,
        eyeColor: 'blue',
        hair: {
          color: 'blonde',
          type: 'wavy',
        },
        ip: '192.168.1.2',
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
        macAddress: 'AA:BB:CC:DD:EE:FF',
        university: 'UCLA',
        bank: {
          cardExpire: '06/24',
          cardNumber: '9876543210987654',
          cardType: 'Mastercard',
          currency: 'USD',
          iban: 'US0987654321',
        },
        company: {
          department: 'Design',
          name: 'Design Studio',
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
        ein: '98-7654321',
        ssn: '987-65-4321',
        userAgent: 'Mozilla/5.0',
        crypto: {
          coin: 'Ethereum',
          wallet: '0xfedcba0987654321',
          network: 'Ethereum',
        },
        role: 'user',
      };

      expect(user.hair).toBeDefined();
      expect(user.hair.color).toBe('blonde');
      expect(user.hair.type).toBe('wavy');
      
      expect(user.address).toBeDefined();
      expect(user.address.coordinates).toBeDefined();
      expect(user.address.coordinates.lat).toBe(34.0522);
      
      expect(user.company).toBeDefined();
      expect(user.company.address).toBeDefined();
      
      expect(user.bank).toBeDefined();
      expect(user.bank.cardNumber).toBe('9876543210987654');
      
      expect(user.crypto).toBeDefined();
      expect(user.crypto.coin).toBe('Ethereum');
    });
  });

  describe('UsersResponse interface', () => {
    it('has correct structure', () => {
      const response: UsersResponse = {
        users: [
          {
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
            height: 180,
            weight: 75,
            eyeColor: 'brown',
            hair: {
              color: 'black',
              type: 'straight',
            },
            ip: '192.168.1.1',
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
            macAddress: '00:11:22:33:44:55',
            university: 'MIT',
            bank: {
              cardExpire: '12/25',
              cardNumber: '1234567890123456',
              cardType: 'Visa',
              currency: 'USD',
              iban: 'US1234567890',
            },
            company: {
              department: 'Engineering',
              name: 'Tech Corp',
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
            ein: '12-3456789',
            ssn: '123-45-6789',
            userAgent: 'Mozilla/5.0',
            crypto: {
              coin: 'Bitcoin',
              wallet: '0x1234567890abcdef',
              network: 'Bitcoin',
            },
            role: 'admin',
          },
        ],
        total: 100,
        skip: 0,
        limit: 30,
      };

      expect(response.users).toBeDefined();
      expect(Array.isArray(response.users)).toBe(true);
      expect(response.users.length).toBe(1);
      expect(response.total).toBe(100);
      expect(response.skip).toBe(0);
      expect(response.limit).toBe(30);
    });

    it('can have empty users array', () => {
      const response: UsersResponse = {
        users: [],
        total: 0,
        skip: 0,
        limit: 30,
      };

      expect(response.users).toEqual([]);
      expect(response.total).toBe(0);
    });

    it('can have multiple users', () => {
      const response: UsersResponse = {
        users: [
          {
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
            height: 180,
            weight: 75,
            eyeColor: 'brown',
            hair: {
              color: 'black',
              type: 'straight',
            },
            ip: '192.168.1.1',
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
            macAddress: '00:11:22:33:44:55',
            university: 'MIT',
            bank: {
              cardExpire: '12/25',
              cardNumber: '1234567890123456',
              cardType: 'Visa',
              currency: 'USD',
              iban: 'US1234567890',
            },
            company: {
              department: 'Engineering',
              name: 'Tech Corp',
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
            ein: '12-3456789',
            ssn: '123-45-6789',
            userAgent: 'Mozilla/5.0',
            crypto: {
              coin: 'Bitcoin',
              wallet: '0x1234567890abcdef',
              network: 'Bitcoin',
            },
            role: 'admin',
          },
          {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            maidenName: '',
            age: 25,
            gender: 'female',
            email: 'jane.smith@example.com',
            phone: '+0987654321',
            username: 'janesmith',
            birthDate: '1998-05-15',
            image: 'https://example.com/jane.jpg',
            bloodGroup: 'B+',
            height: 165,
            weight: 60,
            eyeColor: 'blue',
            hair: {
              color: 'blonde',
              type: 'wavy',
            },
            ip: '192.168.1.2',
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
            macAddress: 'AA:BB:CC:DD:EE:FF',
            university: 'UCLA',
            bank: {
              cardExpire: '06/24',
              cardNumber: '9876543210987654',
              cardType: 'Mastercard',
              currency: 'USD',
              iban: 'US0987654321',
            },
            company: {
              department: 'Design',
              name: 'Design Studio',
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
            ein: '98-7654321',
            ssn: '987-65-4321',
            userAgent: 'Mozilla/5.0',
            crypto: {
              coin: 'Ethereum',
              wallet: '0xfedcba0987654321',
              network: 'Ethereum',
            },
            role: 'user',
          },
        ],
        total: 2,
        skip: 0,
        limit: 30,
      };

      expect(response.users.length).toBe(2);
      expect(response.total).toBe(2);
      expect(response.users[0].firstName).toBe('John');
      expect(response.users[1].firstName).toBe('Jane');
    });
  });
});