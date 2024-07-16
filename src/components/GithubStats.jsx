import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCodeBranch,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { LinkPreview } from './aux/LinkPreview';

const GitHubStats = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState({ user: true, repo: true });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        setUserData(userData);
        setLoading((prev) => ({ ...prev, user: false }));

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&per_page=100`
        );
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repo data');
        }
        const reposData = await reposResponse.json();
        const pm2Dashboard = reposData.find(
          (repo) => repo.name.toLowerCase() === 'profile-card'
        );
        setRepoData(pm2Dashboard);
        setLoading((prev) => ({ ...prev, repo: false }));
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError(error.message);
        setLoading({ user: false, repo: false });
      }
    };
    fetchData();
  }, [username]);

  const SpinnerIcon = () => (
    <FontAwesomeIcon icon={faSpinner} spin className='text-blue-400' />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='flex bg-zinc-950 border-2 border-zinc-900 rounded-xl'
    >
      <div className='flex flex-col items-center justify-center w-1/2 px-4'>
        <FontAwesomeIcon
          icon={faGithubAlt}
          className='mr-2 w-6 h-6 text-zinc-200'
        />
        <h2 className='w-max text-2xl text-white font-semibold mb-2 flex items-center'>
          Github Stats
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-zinc-800 w-full p-4 rounded-xl shadow-lg text-zinc-200'
      >
        {error ? (
          <div className='text-red-500'>Error: {error}</div>
        ) : (
          <div className=' p-3 rounded flex justify-around gap-6'>
            <div>
              <p className='text-gray-400'>Followers</p>
              <p className='text-2xl font-bold'>
                {loading.user ? <SpinnerIcon /> : userData?.followers}
              </p>
            </div>
            <div>
              {loading.repo ? (
                <SpinnerIcon />
              ) : (
                <div>
                  <LinkPreview url='https://github.com/thenickygee/profile-card' />
                  <a
                    href={repoData?.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-blue-400 text-xl font-bold'
                  >
                    {repoData?.name}
                  </a>
                  <LinkPreview />
                </div>
              )}
              <div className='flex items-center mt-1 text-sm text-gray-400'>
                <span className='mr-3'>
                  <FontAwesomeIcon icon={faStar} className='mr-1' />
                  {loading.repo ? <SpinnerIcon /> : repoData?.stargazers_count}
                </span>
                <span>
                  <FontAwesomeIcon icon={faCodeBranch} className='mr-1' />
                  {loading.repo ? <SpinnerIcon /> : repoData?.forks_count}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GitHubStats;
