import React from 'react';
import { User } from '../types';
import ProfileCard from './ProfileCard';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
  return (
    <div>
      {users.map((user) => (
        <ProfileCard key={user.id} user={user} onClick={onUserClick} />
      ))}
    </div>
  );
};

export default UserList;
