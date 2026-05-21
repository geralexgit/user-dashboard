import React from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: React.ReactNode;
  type?: 'gender' | 'role';
  value?: string;
}

const Tag: React.FC<TagProps> = ({ children, type = 'gender', value = '' }) => {
  const getTagClass = (): string => {
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

  const tagClass = `${styles.tag} ${getTagClass()}`;

  return (
    <span className={tagClass}>
      {children}
    </span>
  );
};

export default Tag;