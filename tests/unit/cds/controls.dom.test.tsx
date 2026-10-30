import React, { createRef } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CdsButton, CdsInput } from '../../../packages/desktop/src/renderer/components/base/CDS';

afterEach(cleanup);

describe('CDS form controls', () => {
  it('does not submit an enclosing form by default', async () => {
    const submit = vi.fn((event: React.FormEvent) => event.preventDefault());
    const click = vi.fn();
    render(
      <form onSubmit={submit}>
        <CdsButton onClick={click}>Action</CdsButton>
      </form>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(click).toHaveBeenCalledOnce();
    expect(submit).not.toHaveBeenCalled();
  });

  it('prevents duplicate actions while loading', async () => {
    const click = vi.fn();
    render(
      <CdsButton loading onClick={click}>
        Save
      </CdsButton>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(click).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('keeps explicitly disabled actions disabled', async () => {
    const click = vi.fn();
    render(
      <CdsButton disabled onClick={click}>
        Save
      </CdsButton>
    );
    await userEvent.click(screen.getByRole('button'));
    expect(click).not.toHaveBeenCalled();
  });

  it('forwards input focus and preserves native typing', async () => {
    const ref = createRef<HTMLInputElement>();
    render(<CdsInput ref={ref} aria-label='Name' />);
    ref.current?.focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
    await userEvent.keyboard('AionUI');
    expect(screen.getByRole('textbox')).toHaveValue('AionUI');
  });

  it('does not accept typing in a disabled field', async () => {
    render(<CdsInput disabled aria-label='Name' />);
    await userEvent.type(screen.getByRole('textbox'), 'ignored');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
