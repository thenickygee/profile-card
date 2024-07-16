import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ percentage, color }) => (
  <div className='w-full bg-gray-700 rounded-full h-2.5'>
    <motion.div
      className={`h-2.5 rounded-full ${color}`}
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
  </div>
);

const TotalExperienceComponent = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const networkEngineeringYears = 9 + 9 / 12; // 9 years 9 months
  const softwareDevelopmentYears = 2 + 7 / 12; // 2 years 7 months
  const totalYears = networkEngineeringYears + softwareDevelopmentYears;
  const totalYearsRounded = Math.round(totalYears * 10) / 10; // Round to 1 decimal place

  const networkPercentage = (networkEngineeringYears / totalYears) * 100;
  const softwarePercentage = (softwareDevelopmentYears / totalYears) * 100;

  return (
    <>
      <motion.div
        initial={{ opacity: 0.5, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='flex flex-col gap-4'
      >
        <div className='flex justify-between items-center'></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className='relative shadow-inner bg-gradient-to-tr from-zinc-900 to-zinc-800/90 border-zinc-800 p-4 rounded-xl w-full mx-auto select-none'
        >
          <motion.div
            className='mb-2'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <span className='text-zinc-200 text-2xl font-bold'>
              {totalYearsRounded}{' '}
              <span className='font-thin'>years of experience</span>
            </span>
          </motion.div>
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between items-center mb-1'>
                <span className='text-blue-400 font-semibold'>
                  Network Engineering
                </span>
                <span className='text-zinc-300'>
                  {networkEngineeringYears.toFixed(1)} years
                </span>
              </div>
              <ProgressBar percentage={networkPercentage} color='bg-blue-400' />
            </div>
            <div>
              <div className='flex justify-between items-center mb-1'>
                <span className='text-green-400 font-semibold'>
                  Software Development
                </span>
                <span className='text-zinc-300'>
                  {softwareDevelopmentYears.toFixed(1)} years
                </span>
              </div>
              <ProgressBar
                percentage={softwarePercentage}
                color='bg-green-400'
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default TotalExperienceComponent;
