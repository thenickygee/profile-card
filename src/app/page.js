'use client';
import ProfileCard from '@/components/ProfileCard';
import ProjectDetails from '@/components/ProjectDetails';

export default function Home() {
  return (
    <main className='bg-zinc-900 flex flex-col min-h-screen items-center justify-between gap-16'>
      <div className='mt-6'>
        <div className='text-transparent opacity-0'>spacer</div>
        <ProfileCard />
      </div>
      <ProjectDetails />
    </main>
  );
}
