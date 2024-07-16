import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { encode } from 'qss';
import * as HoverCard from '@radix-ui/react-hover-card';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { cn } from '../../../utils/cn';

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const src = isStatic
    ? imageSrc
    : `https://api.microlink.io/?${encode({
        url,
        screenshot: true,
        meta: false,
        embed: 'screenshot.url',
        colorScheme: 'dark',
        'viewport.isMobile': true,
        'viewport.deviceScaleFactor': 1,
        'viewport.width': width * 3,
        'viewport.height': height * 3,
      })}`;

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event) => {
    const { left, width: rectWidth } =
      event.currentTarget.getBoundingClientRect();
    const offsetFromCenter = (event.clientX - left - rectWidth / 2) / 2;
    x.set(offsetFromCenter);
  };

  if (!url) {
    console.error('LinkPreview: url prop is required');
    return null;
  }

  return (
    <>
      {isMounted && (
        <div className='hidden'>
          <Image
            src={src}
            width={width}
            height={height}
            quality={quality}
            priority
            alt='hidden image'
          />
        </div>
      )}
      <HoverCard.Root openDelay={50} closeDelay={100} onOpenChange={setIsOpen}>
        <HoverCard.Trigger asChild>
          <Link
            href={url}
            className={cn('text-zinc-200', className)}
            onMouseMove={handleMouseMove}
          >
            {children}
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Content
          className='[transform-origin:var(--radix-hover-card-content-transform-origin)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
          side='top'
          align='center'
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className='shadow-xl rounded-xl'
                style={{ x: translateX }}
              >
                <Link
                  href={url}
                  className='block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800 dark:bg-gray-800'
                >
                  <Image
                    src={src}
                    width={width}
                    height={height}
                    quality={quality}
                    priority
                    className='rounded-lg'
                    alt='preview image'
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCard.Content>
      </HoverCard.Root>
    </>
  );
};
