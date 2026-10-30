import classNames from 'classnames';
import React, { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './CDS.module.css';

export type CdsInputProps = InputHTMLAttributes<HTMLInputElement>;

/** Native input semantics with CDS styling and an imperative focus ref. */
export const CdsInput = forwardRef<HTMLInputElement, CdsInputProps>(function CdsInput({ className, ...props }, ref) {
  return <input {...props} ref={ref} className={classNames(styles.input, className)} />;
});
