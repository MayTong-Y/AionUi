import * as Dialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import styles from './CDS.module.css';

export const CdsDialog = Dialog.Root;
export const CdsDialogTrigger = Dialog.Trigger;
export const CdsDialogClose = Dialog.Close;
export const CdsDialogTitle = Dialog.Title;
export const CdsDialogDescription = Dialog.Description;

export const CdsDialogContent = forwardRef<
  ComponentRef<typeof Dialog.Content>,
  ComponentPropsWithoutRef<typeof Dialog.Content>
>(function CdsDialogContent({ className, children, ...props }, ref) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content {...props} ref={ref} className={classNames(styles.dialog, className)}>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
});
