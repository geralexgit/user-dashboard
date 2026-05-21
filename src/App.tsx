import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { userApi } from './api';
import { User } from './types';
import UserDetails from './UserDetails';
import styles from './App.module.css';

interface TableColumn {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: User) => React.ReactNode;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchUsers = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const data = await userApi.getAllUsers(limit, skip);
      setUsers(data.users);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchUsers(1, pageSize);
      setCurrentPage(1);
      return;
    }

    setLoading(true);
    try {
      const data = await userApi.searchUsers(searchQuery);
      setUsers(data.users);
      setTotal(data.total);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching users:', error);
      alert('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setCurrentPage(1);
    fetchUsers(1, pageSize);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const showUserDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsVisible(true);
  };

  const getTagClass = (value: string, type: 'gender' | 'role'): string => {
    if (type === 'gender') {
      return value === 'male' ? styles.tagBlue : styles.tagPink;
    }
    if (type === 'role') {
      if (value === 'admin') return styles.tagRed;
      if (value === 'moderator') return styles.tagOrange;
      return styles.tagBlue;
    }
    return styles.tagBlue;
  };

  const columns: TableColumn[] = [
    {
      key: 'image',
      title: 'Avatar',
      width: 80,
      render: (image: string) => (
        <img src={image} alt="avatar" className={styles.avatar} />
      ),
    },
    {
      key: 'name',
      title: 'Name',
      width: 200,
      render: (_, record: User) => (
        <div className={styles.nameContainer}>
          <div className={styles.name}>
            {record.firstName} {record.lastName}
          </div>
          <div className={styles.username}>@{record.username}</div>
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
        <span className={`${styles.tag} ${getTagClass(gender, 'gender')}`}>
          {gender.toUpperCase()}
        </span>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      width: 120,
      align: 'center',
      render: (role: string) => (
        <span className={`${styles.tag} ${getTagClass(role, 'role')}`}>
          {role.toUpperCase()}
        </span>
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
        <button
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={() => showUserDetails(record)}
        >
          View
        </button>
      ),
    },
  ];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <div className={styles.logoIcon}>👤</div>
          <h1 className={styles.title}>User Dashboard</h1>
        </div>
        <span className={styles.totalTag}>Total Users: {total}</span>
      </header>

      <main className={styles.content}>
        <div className={styles.card}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search users by name..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
              className={styles.searchInput}
            />
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className={`${styles.button} ${styles.defaultButton}`}
              onClick={handleRefresh}
            >
              Reset
            </button>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.loadingSpinner}></div>
            </div>
          ) : (
            <>
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

              <div className={styles.pagination}>
                <button
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className={styles.paginationButton}
                  style={{ padding: '8px' }}
                >
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
                  <option value="30">30 per page</option>
                  <option value="50">50 per page</option>
                </select>
                <span className={styles.paginationInfo}>
                  Showing {startIndex + 1}-{endIndex} of {total} users
                </span>
              </div>
            </>
          )}
        </div>
      </main>

      {detailsVisible && (
        <UserDetails
          user={selectedUser}
          visible={detailsVisible}
          onClose={() => setDetailsVisible(false)}
        />
      )}
    </div>
  );
};

export default App;