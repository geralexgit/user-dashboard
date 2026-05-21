import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  totalUsers: number;
}

const Header: React.FC<HeaderProps> = ({ totalUsers }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <div className={styles.logoIcon}>👤</div>
        <h1 className={styles.title}>User Dashboard</h1>
      </div>
      <span className={styles.totalTag}>Total Users: {totalUsers}</span>
    </header>
  );
};

export default Header;