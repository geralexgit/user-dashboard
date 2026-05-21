import React, { ChangeEvent, KeyboardEvent } from 'react';
import Button from '../Button/Button';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  searchQuery: string;
  onSearch: () => void;
  onRefresh: () => void;
  onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearch,
  onRefresh,
  onSearchInputChange,
  onSearchKeyDown,
}) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchQuery}
        onChange={onSearchInputChange}
        onKeyDown={onSearchKeyDown}
        className={styles.searchInput}
      />
      <Button type="primary" onClick={onSearch}>
        Search
      </Button>
      <Button type="default" onClick={onRefresh}>
        Reset
      </Button>
    </div>
  );
};

export default SearchBar;