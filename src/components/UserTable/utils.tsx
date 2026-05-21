import { User } from '../../types';
import Tag from '../Tag/Tag';
import Button from '../Button/Button';

export interface TableColumn {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: User) => React.ReactNode;
  mobilePriority?: number; // Lower number = higher priority for mobile view
  tabletPriority?: number; // Lower number = higher priority for tablet view
}

export const getColumns = (onViewUser: (user: User) => void): TableColumn[] => [
  {
    key: 'image',
    title: 'Avatar',
    width: 80,
    mobilePriority: 1,
    tabletPriority: 1,
    render: (image: string) => (
      <img src={image} alt="avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
    ),
  },
  {
    key: 'name',
    title: 'Name',
    width: 200,
    mobilePriority: 2,
    tabletPriority: 2,
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
    mobilePriority: 3,
    tabletPriority: 3,
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
    mobilePriority: 4,
    tabletPriority: 4,
    render: (age: number) => age.toString(),
  },
  {
    key: 'gender',
    title: 'Gender',
    width: 100,
    align: 'center',
    mobilePriority: 5,
    tabletPriority: 5,
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
    mobilePriority: 6,
    tabletPriority: 6,
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
    mobilePriority: 7,
    tabletPriority: 7,
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
    mobilePriority: 8,
    tabletPriority: 8,
    render: (_, record: User) => record.address.city,
  },
  {
    key: 'actions',
    title: 'Actions',
    width: 120,
    align: 'center',
    mobilePriority: 9,
    tabletPriority: 9,
    render: (_, record: User) => (
      <Button type="primary" onClick={() => onViewUser(record)}>
        View
      </Button>
    ),
  },
];