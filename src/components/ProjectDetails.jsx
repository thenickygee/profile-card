import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Package,
  FileCode,
  GitBranch,
  Copy,
  Check,
  User,
} from 'lucide-react';

const ProjectDetails = () => {
  const [copied, setCopied] = useState(false);

  const projectInfo = {
    name: 'profile-card',
    version: '0.1.0',
    description:
      'A Next.js project for displaying a profile card with GitHub stats and experience information.',
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
    },
    dependencies: {
      '@fortawesome/fontawesome-svg-core': '^6.5.2',
      '@fortawesome/free-brands-svg-icons': '^6.5.2',
      '@fortawesome/free-regular-svg-icons': '^6.5.2',
      '@fortawesome/free-solid-svg-icons': '^6.5.2',
      '@fortawesome/react-fontawesome': '^0.2.2',
      'framer-motion': '^11.3.2',
      'lucide-react': '^0.408.0',
      'radix-ui/react-hover-card': '^0.1.0',
      clsx: '^1.1.1',
      next: '14.2.5',
      react: '^18',
      'react-dom': '^18',
      'react-syntax-highlighter': '^15.5.0',
    },
    devDependencies: {
      eslint: '^8',
      'eslint-config-next': '14.2.5',
      postcss: '^8',
      tailwindcss: '^3.4.1',
    },
    components: [
      'ProfileCard',
      'TotalExperience',
      'GitHubStats',
      'TerminalAnimation',
      'Details',
    ],
    features: [
      'Interactive profile card with 3D tilt effect',
      'GitHub statistics display',
      'Total experience visualization',
      'Terminal-style animation',
      'Responsive design using Tailwind CSS',
    ],
    author: {
      name: 'Nicky Gee',
      website: 'https://nickygee.com',
      github: 'https://github.com/thenickygee',
    },
  };

  const allPackages = {
    ...projectInfo.dependencies,
    ...projectInfo.devDependencies,
  };
  const npmInstallCommand = `npm install ${Object.keys(allPackages).join(' ')}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(npmInstallCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0 }}
      className='bg-black text-zinc-100 p-6 rounded-xl shadow-lg mx-auto'
    >
      <h1 className='text-3xl font-bold mb-6 flex items-center'>
        <Code className='mr-2' />
        {projectInfo.name} v{projectInfo.version}
      </h1>

      <p className='text-zinc-300 mb-6'>{projectInfo.description}</p>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-3 flex items-center'>
          <User className='mr-2' />
          Author
        </h2>
        <div className='bg-zinc-800 w-max p-4 rounded-md'>
          <p className='text-zinc-300'>{projectInfo.author.name}</p>
          <p className='text-zinc-300'>
            <strong>Website:</strong>{' '}
            <a
              href={projectInfo.author.website}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:underline'
            >
              {projectInfo.author.website}
            </a>
          </p>
          <p className='text-zinc-300'>
            <strong>GitHub:</strong>{' '}
            <a
              href={projectInfo.author.github}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:underline'
            >
              {projectInfo.author.github}
            </a>
          </p>
        </div>
      </section>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <section>
          <h2 className='text-xl font-semibold mb-3 flex items-center'>
            <Package className='mr-2' />
            Dependencies
          </h2>
          <ul className='list-disc list-inside text-zinc-300'>
            {Object.entries(projectInfo.dependencies).map(([name, version]) => (
              <li key={name}>
                {name}: {version}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-3 flex items-center'>
            <FileCode className='mr-2' />
            Components
          </h2>
          <ul className='list-disc list-inside text-zinc-300'>
            {projectInfo.components.map((component) => (
              <li key={component}>{component}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className='mt-6'>
        <h2 className='text-xl font-semibold mb-3'>Features</h2>
        <ul className='list-disc list-inside text-zinc-300'>
          {projectInfo.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
      <section className='mt-6'>
        <h2 className='text-xl font-semibold mb-3 flex items-center'>
          <GitBranch className='mr-2' />
          Scripts
        </h2>
        <div className='bg-zinc-800 w-max p-4 rounded-md'>
          {Object.entries(projectInfo.scripts).map(([name, command]) => (
            <div key={name} className='mb-2 last:mb-0'>
              <span className='text-blue-400'>{name}:</span> {command}
            </div>
          ))}
        </div>
      </section>

      <section className='mt-6'>
        <h2 className='text-xl font-semibold mb-3 flex items-center'>
          <Package className='mr-2' />
          All Packages
        </h2>
        <div className='bg-zinc-800 p-4 rounded-md'>
          <div className='flex justify-between items-start mb-2'>
            <span className='text-blue-400'>npm install command:</span>
            <button
              onClick={copyToClipboard}
              className='bg-zinc-700 hover:bg-zinc-600 text-zinc-300 px-2 py-1 rounded-md transition-colors duration-200 flex items-center'
            >
              {copied ? (
                <Check size={16} className='mr-1' />
              ) : (
                <Copy size={16} className='mr-1' />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className='overflow-x-auto'>
            <pre className='text-zinc-300 whitespace-pre-wrap break-all'>
              {npmInstallCommand}
            </pre>
          </div>
        </div>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Dependencies</h3>
            <ul className='list-disc list-inside text-zinc-300'>
              {Object.entries(projectInfo.dependencies).map(
                ([name, version]) => (
                  <li key={name}>
                    {name}: {version}
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Dev Dependencies</h3>
            <ul className='list-disc list-inside text-zinc-300'>
              {Object.entries(projectInfo.devDependencies).map(
                ([name, version]) => (
                  <li key={name}>
                    {name}: {version}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetails;
