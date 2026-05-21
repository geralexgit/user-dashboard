import React from 'react';
import { User } from '../../types';
import styles from './UserTable.module.css';

interface TableColumn {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: User) => React.ReactNode;
  mobilePriority?: number; // Lower number = higher priority for mobile view
  tabletPriority?: number; // Lower number = higher priority for tablet view
}

interface UserTableProps {
  users: User[];
  columns: TableColumn[];
}

const UserTable: React.FC<UserTableProps> = ({ users, columns }) => {
  // Get value for a column key from user
  const getColumnValue = (column: TableColumn, user: User) => {
    if (column.key === 'image') return user.image;
    if (column.key === 'email') return user.email;
    if (column.key === 'age') return user.age;
    if (column.key === 'gender') return user.gender;
    if (column.key === 'role') return user.role;
    if (column.key === 'company') return user.company.name;
    if (column.key === 'city') return user.address.city;
    if (column.key === 'hair') return `${user.hair.color} - ${user.hair.type}`;
    if (column.key === 'name') return `${user.firstName} ${user.lastName}`;
    return user[column.key as keyof User] as string;
  };

  // Get columns for mobile view (prioritized columns)
  const getMobileColumns = () => {
    return columns
      .filter(col => col.mobilePriority !== undefined)
      .sort((a, b) => (a.mobilePriority || 99) - (b.mobilePriority || 99))
      .slice(0, 3); // Show top 3 prioritized columns on mobile
  };

  // Get columns for tablet view (prioritized columns)
  const getTabletColumns = () => {
    return columns
      .filter(col => col.tabletPriority !== undefined)
      .sort((a, b) => (a.tabletPriority || 99) - (b.tabletPriority || 99))
      .slice(0, 5); // Show top 5 prioritized columns on tablet
  };

  const mobileColumns = getMobileColumns();
  const tabletColumns = getTabletColumns();

  return (
    <>
      {/* Desktop View */}
      <div className={`${styles.tableContainer} ${styles.desktopView}`}>
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
                      ? column.render(getColumnValue(column, user), user)
                      : typeof getColumnValue(column, user) === 'number'
                      ? getColumnValue(column, user).toString()
                      : getColumnValue(column, user)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet View */}
      <div className={`${styles.tableContainer} ${styles.tabletView}`}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {tabletColumns.map((column) => (
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
                {tabletColumns.map((column) => (
                  <td
                    key={`${user.id}-${column.key}`}
                    className={styles.tableCell}
                    style={{ textAlign: column.align || 'left' }}
                  >
                    {column.render
                      ? column.render(getColumnValue(column, user), user)
                      : typeof getColumnValue(column, user) === 'number'
                      ? getColumnValue(column, user).toString()
                      : getColumnValue(column, user)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className={`${styles.mobileContainer} ${styles.mobileView}`}>
        {users.map((user) => (
          <div key={user.id} className={styles.mobileCard}>
            {/* Card Header with Avatar and Name */}
            <div className={styles.mobileCardHeader}>
              {columns.find(col => col.key === 'image')?.render ? (
                columns.find(col => col.key === 'image')!.render!(user.image, user)
              ) : (
                <img 
                  src={user.image} 
                  alt="avatar" 
                  className={styles.mobileAvatar}
                />
              )}
              <div className={styles.mobileNameContainer}>
                <div className={styles.mobileName}>
                  {user.firstName} {user.lastName}
                </div>
                <div className={styles.mobileUsername}>
                  @{user.username}
                </div>
              </div>
            </div>

            {/* Card Body with prioritized columns */}
            <div className={styles.mobileCardBody}>
              {mobileColumns.map((column) => (
                <div key={`${user.id}-${column.key}`} className={styles.mobileField}>
                  <div className={styles.mobileFieldLabel}>{column.title}:</div>
                  <div className={styles.mobileFieldValue}>
                    {column.render
                      ? column.render(getColumnValue(column, user), user)
                      : typeof getColumnValue(column, user) === 'number'
                      ? getColumnValue(column, user).toString()
                      : getColumnValue(column, user)}
                  </div>
                </div>
              ))}
            </div>

            {/* Card Footer with Actions */}
            <div className={styles.mobileCardFooter}>
              {columns.find(col => col.key === 'actions')?.render && (
                columns.find(col => col.key === 'actions')!.render!(null, user)
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserTable;