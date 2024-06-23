import React, { useState } from 'react';
import { User } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

interface ProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onRequestClose, user }) => {
  const [imageError, setImageError] = useState(false);

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onRequestClose}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiUser className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="mb-2 rounded-full text-3xl text-white grid place-items-center mx-auto">
                {user.avatar && !imageError ? (
                  <img
                    className="w-24 h-24 rounded-full"
                    src={user.avatar}
                    alt={`${user.profile.firstName.slice(0, 2).toUpperCase()}`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <FiUser className="w-24 h-24 text-gray-500" />
                )}
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
              <div className="flex gap-2">
                <button
                  onClick={onRequestClose}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
