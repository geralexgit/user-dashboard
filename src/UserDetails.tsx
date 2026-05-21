import React from 'react';
import { Modal, Descriptions, Avatar, Tag, Divider } from 'antd';
import { User } from './types';
// Icons removed - using text alternatives instead

interface UserDetailsProps {
  user: User | null;
  visible: boolean;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, visible, onClose }) => {
  if (!user) return null;

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar size={64} src={user.image} />
          <div>
            <div style={{ fontSize: '20px', fontWeight: 600 }}>
              {user.firstName} {user.lastName}
            </div>
            <div style={{ fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
              @{user.username}
            </div>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Divider />

      <Descriptions title="Personal Information" bordered column={2} size="small">
        <Descriptions.Item label="Full Name">
          {user.firstName} {user.maidenName && `(${user.maidenName})`} {user.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Age">{user.age} years</Descriptions.Item>
        <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
        <Descriptions.Item label="Birth Date">{user.birthDate}</Descriptions.Item>
        <Descriptions.Item label="Email">
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {user.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Blood Group">{user.bloodGroup}</Descriptions.Item>
        <Descriptions.Item label="Eye Color">{user.eyeColor}</Descriptions.Item>
        <Descriptions.Item label="Hair">
          {user.hair.color} - {user.hair.type}
        </Descriptions.Item>
        <Descriptions.Item label="Height / Weight">
          {user.height.toFixed(2)} cm / {user.weight.toFixed(2)} kg
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          <Tag color={user.role === 'admin' ? 'red' : user.role === 'moderator' ? 'orange' : 'blue'}>
            {user.role.toUpperCase()}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Address" bordered column={1} size="small">
        <Descriptions.Item label="Street">{user.address.address}</Descriptions.Item>
        <Descriptions.Item label="City/State">
          {user.address.city}, {user.address.state} ({user.address.stateCode})
        </Descriptions.Item>
        <Descriptions.Item label="Postal Code">{user.address.postalCode}</Descriptions.Item>
        <Descriptions.Item label="Country">{user.address.country}</Descriptions.Item>
        <Descriptions.Item label="Coordinates">
          Lat: {user.address.coordinates.lat}, Lng: {user.address.coordinates.lng}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Company" bordered column={2} size="small">
        <Descriptions.Item label="Company">{user.company.name}</Descriptions.Item>
        <Descriptions.Item label="Department">{user.company.department}</Descriptions.Item>
        <Descriptions.Item label="Title" span={2}>
          {user.company.title}
        </Descriptions.Item>
        <Descriptions.Item label="Company Address" span={2}>
          {user.company.address.address}, {user.company.address.city}, {user.company.address.state}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Banking Information" bordered column={1} size="small">
        <Descriptions.Item label="Card Type">{user.bank.cardType}</Descriptions.Item>
        <Descriptions.Item label="Card Number">
          •••• •••• •••• {user.bank.cardNumber.slice(-4)}
        </Descriptions.Item>
        <Descriptions.Item label="Expires">{user.bank.cardExpire}</Descriptions.Item>
        <Descriptions.Item label="Currency">{user.bank.currency}</Descriptions.Item>
        <Descriptions.Item label="IBAN">{user.bank.iban}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Additional Information" bordered column={2} size="small">
        <Descriptions.Item label="University">{user.university}</Descriptions.Item>
        <Descriptions.Item label="IP Address">{user.ip}</Descriptions.Item>
        <Descriptions.Item label="MAC Address">{user.macAddress}</Descriptions.Item>
        <Descriptions.Item label="SSN">•••-••-{user.ssn.slice(-3)}</Descriptions.Item>
        <Descriptions.Item label="EIN">{user.ein}</Descriptions.Item>
        <Descriptions.Item label="Crypto Coin">{user.crypto.coin}</Descriptions.Item>
        <Descriptions.Item label="Crypto Network" span={2}>
          {user.crypto.network}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserDetails;
