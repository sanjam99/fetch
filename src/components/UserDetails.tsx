import React from 'react';
import { User } from '../types';
import { motion } from 'framer-motion';


const fallbackIconDataUrl = `data:image/svg+xml;base64,${btoa(`
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-24 h-24 text-gray-500"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>`).replace(/\n/g, '')}`;

interface UserDetailsProps {
  user: User | null;
  
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  if (!user) return null;

  return (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="mb-2 rounded-full text-3xl text-white grid place-items-center mx-auto">
          <img
            className="w-24 h-24 rounded-full"
            src={user.avatar}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.style.backgroundImage = `url(${fallbackIconDataUrl})`;
              e.currentTarget.style.backgroundSize = 'cover';
              e.currentTarget.style.backgroundPosition = 'center';
              e.currentTarget.src = ''; // remove the broken image icon
            }}
          />
        </div>
        <h3 className="text-3xl font-bold text-center mb-2">
          {user.profile.firstName} {user.profile.lastName}
        </h3>
        <p className="text-center mb-6">{user.Bio}</p>
        <div className="text-center mb-6">
          <p className="text-gray-200">Job Title: {user.jobTitle}</p>
          <p className="text-gray-200">Email: {user.profile.email}</p>
          <p className="text-gray-200">Username: {user.profile.username}</p>
          <p className="text-gray-200">Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDetails;
