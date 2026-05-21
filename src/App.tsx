import React, { useState, useEffect, ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userApi } from './api';
import { User } from './types';
import UserDetails from './components/UserDetailes/UserDetails';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';
import { getColumns } from './components/UserTable/utils';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import styles from './App.module.css';

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read initial values from URL parameters
  const urlPage = searchParams.get('page');
  const urlPageSize = searchParams.get('pageSize');
  const urlSearch = searchParams.get('search');

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(urlSearch || '');
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(urlPage ? parseInt(urlPage) : 1);
  const [pageSize, setPageSize] = useState<number>(urlPageSize ? parseInt(urlPageSize) : 10);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

  // Function to update URL parameters
  const updateUrlParams = useCallback((updates: { page?: number; pageSize?: number; search?: string }) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (updates.page !== undefined) {
      newParams.set('page', updates.page.toString());
    }
    if (updates.pageSize !== undefined) {
      newParams.set('pageSize', updates.pageSize.toString());
    }
    if (updates.search !== undefined) {
      if (updates.search) {
        newParams.set('search', updates.search);
      } else {
        newParams.delete('search');
      }
    }
    
    setSearchParams(newParams, { replace: true });
  }, [searchParams, setSearchParams]);

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
      updateUrlParams({ page: 1, search: '' });
      return;
    }

    setLoading(true);
    try {
      const data = await userApi.searchUsers(searchQuery);
      setUsers(data.users);
      setTotal(data.total);
      setCurrentPage(1);
      updateUrlParams({ page: 1, search: searchQuery });
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
    updateUrlParams({ page: 1, search: '', pageSize: pageSize });
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
    updateUrlParams({ page: newPage });
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1);
    updateUrlParams({ pageSize: newSize, page: 1 });
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