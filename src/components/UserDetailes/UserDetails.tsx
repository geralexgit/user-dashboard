import React, { useEffect } from 'react';
import { User } from '../../types';
import styles from './UserDetails.module.css';

interface UserDetailsProps {
  user: User | null;
  visible: boolean;
  onClose: () => void;
}

interface DescriptionItem {
  label: string;
  value: React.ReactNode;
  span?: number;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, visible, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && visible) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onClose]);

  if (!user || !visible) return null;

  const getTagClass = (role: string): string => {
    if (role === 'admin') return styles.tagRed;
    if (role === 'moderator') return styles.tagOrange;
    return styles.tagBlue;
  };

  const personalInfo: DescriptionItem[] = [
    { label: 'Full Name', value: `${user.firstName} ${user.maidenName ? `(${user.maidenName})` : ''} ${user.lastName}` },
    { label: 'Age', value: `${user.age} years` },
    { label: 'Gender', value: user.gender },
    { label: 'Birth Date', value: user.birthDate },
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone },
    { label: 'Blood Group', value: user.bloodGroup },
    { label: 'Eye Color', value: user.eyeColor },
    { label: 'Hair', value: `${user.hair.color} - ${user.hair.type}` },
    { label: 'Height / Weight', value: `${user.height.toFixed(2)} cm / ${user.weight.toFixed(2)} kg` },
    { label: 'Role', value: <span className={`${styles.tag} ${getTagClass(user.role)}`}>{user.role.toUpperCase()}</span> },
  ];

  const addressInfo: DescriptionItem[] = [
    { label: 'Street', value: user.address.address },
    { label: 'City/State', value: `${user.address.city}, ${user.address.state} (${user.address.stateCode})` },
    { label: 'Postal Code', value: user.address.postalCode },
    { label: 'Country', value: user.address.country },
    { label: 'Coordinates', value: `Lat: ${user.address.coordinates.lat}, Lng: ${user.address.coordinates.lng}` },
  ];

  const companyInfo: DescriptionItem[] = [
    { label: 'Company', value: user.company.name },
    { label: 'Department', value: user.company.department },
    { label: 'Title', value: user.company.title, span: 2 },
    { label: 'Company Address', value: `${user.company.address.address}, ${user.company.address.city}, ${user.company.address.state}`, span: 2 },
  ];

  const bankingInfo: DescriptionItem[] = [
    { label: 'Card Type', value: user.bank.cardType },
    { label: 'Card Number', value: `•••• •••• •••• ${user.bank.cardNumber.slice(-4)}` },
    { label: 'Expires', value: user.bank.cardExpire },
    { label: 'Currency', value: user.bank.currency },
    { label: 'IBAN', value: user.bank.iban },
  ];

  const additionalInfo: DescriptionItem[] = [
    { label: 'University', value: user.university },
    { label: 'IP Address', value: user.ip },
    { label: 'MAC Address', value: user.macAddress },
    { label: 'SSN', value: `•••-••-${user.ssn.slice(-3)}` },
    { label: 'EIN', value: user.ein },
    { label: 'Crypto Coin', value: user.crypto.coin },
    { label: 'Crypto Network', value: user.crypto.network, span: 2 },
  ];

  const renderDescriptions = (items: DescriptionItem[], columns: number = 2) => {
    const rows: DescriptionItem[][] = [];
    let currentRow: DescriptionItem[] = [];
    let currentSpan = 0;

    items.forEach((item) => {
      const itemSpan = item.span || 1;
      if (currentSpan + itemSpan > columns) {
        rows.push([...currentRow]);
        currentRow = [item];
        currentSpan = itemSpan;
      } else {
        currentRow.push(item);
        currentSpan += itemSpan;
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return (
      <table className={`${styles.descriptions} ${styles.descriptionsBordered}`}>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.descriptionsRow}>
              {row.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <td className={styles.descriptionsLabel} colSpan={1}>
                    {item.label}
                  </td>
                  <td
                    className={styles.descriptionsValue}
                    colSpan={(item.span || 1) * 2 - 1}
                  >
                    {item.value}
                  </td>
                </React.Fragment>
              ))}
              {/* Fill empty cells if needed */}
              {(() => {
                const rowSpan = row.reduce((sum, item) => sum + (item.span || 1), 0);
                const emptyCells = columns - rowSpan;
                if (emptyCells > 0) {
                  return (
                    <>
                      <td className={styles.descriptionsLabel} colSpan={emptyCells}></td>
                      <td className={styles.descriptionsValue} colSpan={emptyCells * 2 - 1}></td>
                    </>
                  );
                }
                return null;
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <img src={user.image} alt="avatar" className={styles.modalAvatar} />
            <div>
              <h2 className={styles.modalName}>
                {user.firstName} {user.lastName}
              </h2>
              <p className={styles.modalUsername}>@{user.username}</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          {renderDescriptions(personalInfo, 2)}

          <div className={styles.divider} />

          <h3 className={styles.sectionTitle}>Address</h3>
          {renderDescriptions(addressInfo, 1)}

          <div className={styles.divider} />

          <h3 className={styles.sectionTitle}>Company</h3>
          {renderDescriptions(companyInfo, 2)}

          <div className={styles.divider} />

          <h3 className={styles.sectionTitle}>Banking Information</h3>
          {renderDescriptions(bankingInfo, 1)}

          <div className={styles.divider} />

          <h3 className={styles.sectionTitle}>Additional Information</h3>
          {renderDescriptions(additionalInfo, 2)}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;