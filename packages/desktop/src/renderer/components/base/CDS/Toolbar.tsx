import * as Toolbar from '@radix-ui/react-toolbar';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import styles from './CDS.module.css';

export const CdsToolbar = forwardRef<ComponentRef<typeof Toolbar.Root>, ComponentPropsWithoutRef<typeof Toolbar.Root>>(
  function CdsToolbar({ className, ...props }, ref) {
    return <Toolbar.Root {...props} ref={ref} className={classNames(styles.toolbar, className)} />;
  }
);

export const CdsToolbarButton = forwardRef<
  ComponentRef<typeof Toolbar.Button>,
  ComponentPropsWithoutRef<typeof Toolbar.Button>
>(function CdsToolbarButton({ className, ...props }, ref) {
  return (
    <Toolbar.Button
      {...props}
      ref={ref}
      className={classNames(styles.button, styles.ghost, styles.medium, className)}
    />
  );
});

export const CdsToolbarSeparator = forwardRef<
  ComponentRef<typeof Toolbar.Separator>,
  ComponentPropsWithoutRef<typeof Toolbar.Separator>
>(function CdsToolbarSeparator({ className, ...props }, ref) {
  return <Toolbar.Separator {...props} ref={ref} className={classNames(styles.separator, className)} />;
});
