import { User } from '../../types';
import Tag from '../Tag/Tag';
import Button from '../Button/Button';

export interface TableColumn {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: User) => React.ReactNode;
}

export const getColumns = (onViewUser: (user: User) => void): TableColumn[] => [
  {
    key: 'image',
    title: 'Avatar',
    width: 80,
    render: (image: string) => (
      <img src={image} alt="avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
    ),
  },
  {
    key: 'name',
    title: 'Name',
    width: 200,
    render: (_, record: User) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 600 }}>
          {record.firstName} {record.lastName}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>@{record.username}</div>
      </div>
    ),
  },
  {
    key: 'email',
    title: 'Email',
    width: 250,
    render: (email: string) => (
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {email}
      </div>
    ),
  },
  {
    key: 'age',
    title: 'Age',
    width: 80,
    align: 'center',
    render: (age: number) => age.toString(),
  },
  {
    key: 'gender',
    title: 'Gender',
    width: 100,
    align: 'center',
    render: (gender: string) => (
      <Tag type="gender" value={gender}>
        {gender.toUpperCase()}
      </Tag>
    ),
  },
  {
    key: 'role',
    title: 'Role',
    width: 120,
    align: 'center',
    render: (role: string) => (
      <Tag type="role" value={role}>
        {role.toUpperCase()}
      </Tag>
    ),
  },
  {
    key: 'company',
    title: 'Company',
    width: 200,
    render: (_, record: User) => (
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {record.company.name}
      </div>
    ),
  },
  {
    key: 'city',
    title: 'City',
    width: 150,
    render: (_, record: User) => record.address.city,
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 120,
    align: 'center',
    render: (_, record: User) => (
      <Button type="primary" onClick={() => onViewUser(record)}>
        View
      </Button>
    ),
  },
];