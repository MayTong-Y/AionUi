import * as Select from '@radix-ui/react-select';
import classNames from 'classnames';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import React, { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import styles from './CDS.module.css';

export const CdsSelect = Select.Root;
export const CdsSelectValue = Select.Value;
export const CdsSelectGroup = Select.Group;

export const CdsSelectTrigger = forwardRef<
  ComponentRef<typeof Select.Trigger>,
  ComponentPropsWithoutRef<typeof Select.Trigger>
>(function CdsSelectTrigger({ className, children, ...props }, ref) {
  return (
    <Select.Trigger {...props} ref={ref} className={classNames(styles.selectTrigger, className)}>
      {children}
      <Select.Icon asChild>
        <ChevronDown size={16} strokeWidth={1.75} aria-hidden='true' />
      </Select.Icon>
    </Select.Trigger>
  );
});

export const CdsSelectContent = forwardRef<
  ComponentRef<typeof Select.Content>,
  ComponentPropsWithoutRef<typeof Select.Content>
>(function CdsSelectContent({ className, children, position = 'popper', sideOffset = 6, ...props }, ref) {
  return (
    <Select.Portal>
      <Select.Content
        {...props}
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={classNames(styles.selectContent, className)}
      >
        <Select.ScrollUpButton className={styles.selectScroll}>
          <ChevronUp size={16} aria-hidden='true' />
        </Select.ScrollUpButton>
        <Select.Viewport className={styles.selectViewport}>{children}</Select.Viewport>
        <Select.ScrollDownButton className={styles.selectScroll}>
          <ChevronDown size={16} aria-hidden='true' />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  );
});

export const CdsSelectItem = forwardRef<ComponentRef<typeof Select.Item>, ComponentPropsWithoutRef<typeof Select.Item>>(
  function CdsSelectItem({ className, children, ...props }, ref) {
    return (
      <Select.Item {...props} ref={ref} className={classNames(styles.selectItem, className)}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={styles.selectIndicator}>
          <Check size={16} strokeWidth={1.75} aria-hidden='true' />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
