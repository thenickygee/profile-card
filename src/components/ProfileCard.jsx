import React, { useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faLinkedin,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import TotalExperienceComponent from './TotalExperience';
import GitHubStats from './GithubStats';
import TerminalAnimation from './TerminalAnimation';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const user = {
  name: 'Rick Sanchez',
  role: 'Crazy Scientist',
  image: '/rick.png',
};

const socials = [
  {
    icon: faTwitter,
    url: 'https://twitter.com/thenickygee',
    label: 'Twitter',
  },
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/thenickygee/',
    label: 'LinkedIn',
  },
  { icon: faGithub, url: 'https://github.com/thenickygee', label: 'GitHub' },
];

const SocialLink = ({ icon, url, label }) => (
  <motion.a
    href={url}
    target='_blank'
    rel='noopener noreferrer'
    className='relative group'
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <div className='absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 rounded-full opacity-0 group-hover:opacity-100 blur-2xl group-hover:blur transition-all duration-300' />
    <div className='flex -m-1 items-center relative hover:bg-black text-zinc-200 p-2 rounded-full group-hover:text-white transition-colors duration-300'>
      <FontAwesomeIcon icon={icon} className='w-5 h-5' />
    </div>
  </motion.a>
);

const ImageModal = ({ isOpen, onClose, imageSrc, altText }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className='absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl'
        onClick={onClose}
      >
        <div
          className='bg-zinc-800 p-4 rounded-lg max-w-[90%] max-h-[90%]'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='w-full flex justify-end items-center'>
            <button
              className='w-max  text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors'
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimesCircle} className='h-5 w-5' />
            </button>
          </div>
          <img
            src={imageSrc}
            alt={altText}
            className='mt-4 max-w-full max-h-[80vh] rounded-lg object-contain'
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProfileCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-1, 1], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-1, 1], ['-10deg', '10deg']);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 1;
    const yPct = (event.clientY - rect.top) / rect.height - 1;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      className='transition-all duration-300 bg-black hover:bg-black/80 ease-linear w-full min-w-full max-w-xl border-0 border-zinc-900 p-3 rounded-3xl shadow-xl shadow-black flex h-min relative'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        transition: { duration: 0.3 },
      }}
    >
      <div
        className='w-full p-6 rounded-3xl flex flex-col gap-6 bg-gradient-to-r from-purple-600/5 via-blue-600/10 to-green-600/5 relative'
        style={{ transform: 'translateZ(50px)', pointerEvents: 'auto' }}
      >
        <div className='flex gap-4 items-center relative z-10'>
          <img
            src={user.image}
            alt={user.name}
            className='rounded-full w-28 h-28 object-cover mx-auto cursor-pointer'
            onClick={() => setIsModalOpen(true)}
          />
          <div className='w-full'>
            <h1 className='text-4xl font-bold text-gray-200'>{user.name}</h1>
            <p className='text-gray-200 text-lg'>{user.role}</p>
            <div className='flex gap-1'>
              {socials.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </div>
          </div>
        </div>
        <TerminalAnimation />
        <GitHubStats username='thenickygee' />
        <TotalExperienceComponent />
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageSrc={user.image}
          altText={user.name}
        />
      </div>
    </motion.div>
  );
};

export default ProfileCard;
