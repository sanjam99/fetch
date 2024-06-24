import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { User } from '../types';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProfileCardProps {
  user: User;
  onClick: (user: User) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={ref}
      onClick={() => onClick(user)}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      <div
        className="profile-card p-4 border rounded-lg shadow-lg cursor-pointer flex items-center space-x-4 transition-colors duration-300 hover:bg-purple-600 hover:text-white"
      >
        {user.avatar && !imageError ? (
          <img
            className="w-12 h-12 rounded-full"
            src={user.avatar}
            alt={`${user.profile.firstName.slice(0, 2).toUpperCase()}`}
            onError={() => setImageError(true)}
          />
        ) : (
          <FiUser className="w-12 h-12 text-gray-500" />
        )}
        <div className="hover:text-white transition-colors">
          <h2 className="text-lg font-semibold border-b pb-1">{`${user.profile.firstName} ${user.profile.lastName}`}</h2>
          <p className="">{user.jobTitle}</p>
          <p className="">{user.profile.username}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
