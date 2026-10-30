import classNames from 'classnames';
import { LoaderCircle } from 'lucide-react';
import React, { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './CDS.module.css';

export type CdsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large' | 'icon';
  leadingIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  iconOnly?: boolean;
  tone?: 'default' | 'danger' | 'warning' | 'success';
  loading?: boolean;
};

/** Shared CDS action; labels and accessible names come from the caller. */
export const CdsButton = forwardRef<HTMLButtonElement, CdsButtonProps>(function CdsButton(
  {
    variant = 'secondary',
    size = 'medium',
    leadingIcon,
    fullWidth,
    rounded,
    iconOnly,
    tone = 'default',
    loading = false,
    disabled,
    type = 'button',
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-tone={tone}
      data-full-width={fullWidth || undefined}
      data-rounded={rounded || undefined}
      data-icon-only={iconOnly || undefined}
      className={classNames(styles.button, styles[variant], styles[size], className)}
    >
      {loading ? (
        <LoaderCircle size={16} strokeWidth={1.75} aria-hidden='true' className={styles.spinner} />
      ) : (
        leadingIcon
      )}
      {children}
    </button>
  );
});
