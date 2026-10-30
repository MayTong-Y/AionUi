import * as Popover from '@radix-ui/react-popover';
import * as Tooltip from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import styles from './CDS.module.css';

export const CdsPopover = Popover.Root;
export const CdsPopoverTrigger = Popover.Trigger;
export const CdsPopoverClose = Popover.Close;
export const CdsPopoverAnchor = Popover.Anchor;

export const CdsPopoverContent = forwardRef<
  ComponentRef<typeof Popover.Content>,
  ComponentPropsWithoutRef<typeof Popover.Content>
>(function CdsPopoverContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <Popover.Portal>
      <Popover.Content {...props} ref={ref} sideOffset={sideOffset} className={classNames(styles.popover, className)} />
    </Popover.Portal>
  );
});

export const CdsTooltipProvider = Tooltip.Provider;
export const CdsTooltip = Tooltip.Root;
export const CdsTooltipTrigger = Tooltip.Trigger;

export const CdsTooltipContent = forwardRef<
  ComponentRef<typeof Tooltip.Content>,
  ComponentPropsWithoutRef<typeof Tooltip.Content>
>(function CdsTooltipContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <Tooltip.Portal>
      <Tooltip.Content {...props} ref={ref} sideOffset={sideOffset} className={classNames(styles.tooltip, className)} />
    </Tooltip.Portal>
  );
});
