import { MotionConfig } from 'framer-motion';
import type { LucideIcon, LucideProps } from 'lucide-react';
import React from 'react';
import type { PropsWithChildren } from 'react';
import { CdsTooltipProvider } from './Overlays';

/** Install once around the new shell; animation respects the OS preference. */
export function CdsProvider({ children }: PropsWithChildren) {
  return (
    <MotionConfig reducedMotion='user'>
      <CdsTooltipProvider delayDuration={400}>{children}</CdsTooltipProvider>
    </MotionConfig>
  );
}

/** Keep icon sizing consistent without importing the full icon registry. */
export function CdsIcon({ icon: Icon, size = 16, strokeWidth = 1.75, ...props }: LucideProps & { icon: LucideIcon }) {
  return <Icon aria-hidden='true' {...props} size={size} strokeWidth={strokeWidth} />;
}
