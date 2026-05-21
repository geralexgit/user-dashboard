import React, { useState, useEffect } from 'react';
import {
  Layout,
  Table,
  Input,
  Button,
  Space,
  Avatar,
  Tag,
  Typography,
  message,
  Card,
  Spin,
} from 'antd';
// Icons removed - using text alternatives instead
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { userApi } from './api';
import { User } from './types';
import UserDetails from './UserDetails';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

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
      message.error('Failed to fetch users');
      console.error('Error fetching users:', error);
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
      message.error('Failed to search users');
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setCurrentPage(1);
    fetchUsers(1, pageSize);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  const showUserDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsVisible(true);
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image: string) => (
        <Avatar size={48} src={image} />
      ),
    },
    {
      title: 'Name',
      key: 'name',
      width: 200,
      render: (_, record: User) => (
        <div>
          <div style={{ fontWeight: 600 }}>
            {record.firstName} {record.lastName}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>@{record.username}</div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      align: 'center',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
      align: 'center',
      render: (gender: string) => (
        <Tag color={gender === 'male' ? 'blue' : 'pink'}>{gender.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      align: 'center',
      render: (role: string) => (
        <Tag
          color={
            role === 'admin' ? 'red' : role === 'moderator' ? 'orange' : 'blue'
          }
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Company',
      dataIndex: ['company', 'name'],
      key: 'company',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'City',
      dataIndex: ['address', 'city'],
      key: 'city',
      width: 150,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (_, record: User) => (
        <Button
          type="primary"
          onClick={() => showUserDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '28px', color: '#1890ff', fontWeight: 'bold' }}>👤</div>
          <Title level={3} style={{ margin: 0 }}>
            User Dashboard
          </Title>
        </div>
        <Tag color="blue">Total Users: {total}</Tag>
      </Header>

      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <div style={{ display: 'flex', gap: '12px' }}>
              <Input
                placeholder="Search users by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onPressEnter={handleSearch}
                style={{ flex: 1 }}
                size="large"
              />
              <Button
                type="primary"
                onClick={handleSearch}
                size="large"
              >
                Search
              </Button>
              <Button
                onClick={handleRefresh}
                size="large"
              >
                Reset
              </Button>
            </div>

            <Spin spinning={loading}>
              <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: total,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} users`,
                  pageSizeOptions: ['10', '20', '30', '50'],
                }}
                onChange={handleTableChange}
                scroll={{ x: 1300 }}
              />
            </Spin>
          </Space>
        </Card>
      </Content>

      <UserDetails
        user={selectedUser}
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
      />
    </Layout>
  );
};

export default App;
