import React from 'react';
import { User } from '../../types';
import styles from './UserTable.module.css';

interface TableColumn {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: User) => React.ReactNode;
}

interface UserTableProps {
  users: User[];
  columns: TableColumn[];
}

const UserTable: React.FC<UserTableProps> = ({ users, columns }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={styles.tableHeaderCell}
                style={{
                  width: column.width,
                  textAlign: column.align || 'left',
                }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.tableRow}>
              {columns.map((column) => (
                <td
                  key={`${user.id}-${column.key}`}
                  className={styles.tableCell}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {column.render
                    ? column.render(
                        column.key === 'image'
                          ? user.image
                          : column.key === 'email'
                          ? user.email
                          : column.key === 'age'
                          ? user.age
                          : column.key === 'gender'
                          ? user.gender
                          : column.key === 'role'
                          ? user.role
                          : column.key === 'company'
                          ? user.company.name
                          : column.key === 'city'
                          ? user.address.city
                          : column.key === 'hair'
                          ? `${user.hair.color} - ${user.hair.type}`
                          : user[column.key as keyof User] as string,
                        user
                      )
                    : column.key === 'image'
                    ? user.image
                    : column.key === 'email'
                    ? user.email
                    : column.key === 'age'
                    ? user.age.toString()
                    : column.key === 'gender'
                    ? user.gender
                    : column.key === 'role'
                    ? user.role
                    : column.key === 'company'
                    ? user.company.name
                    : column.key === 'city'
                    ? user.address.city
                    : column.key === 'hair'
                    ? `${user.hair.color} - ${user.hair.type}`
                    : user[column.key as keyof User] as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;