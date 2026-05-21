import React from 'react';
import styles from './Loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
      <div className={styles.loadingText}>Loading...</div>
    </div>
  );
};

export default Loading;