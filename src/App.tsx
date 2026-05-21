import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { userApi } from './api';
import { User } from './types';
import UserDetails from './components/UserDetailes/UserDetails';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserTable, { getColumns } from './components/UserTable';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import styles from './App.module.css';

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

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const showUserDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsVisible(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(total / pageSize);
  const columns = getColumns(showUserDetails);

  return (
    <div className={styles.app}>
      <Header totalUsers={total} />

      <main className={styles.content}>
        <div className={styles.card}>
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onRefresh={handleRefresh}
            onSearchInputChange={handleSearchInputChange}
            onSearchKeyDown={handleSearchKeyDown}
          />

          {loading ? (
            <Loading />
          ) : (
            <>
              <UserTable
                users={users}
                columns={columns}
                onRowClick={showUserDetails}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                total={total}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
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