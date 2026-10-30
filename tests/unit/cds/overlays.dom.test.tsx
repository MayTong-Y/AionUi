import React from 'react';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  CdsButton,
  CdsDialog,
  CdsDialogContent,
  CdsDialogDescription,
  CdsDialogTitle,
  CdsDialogTrigger,
  CdsPopover,
  CdsPopoverContent,
  CdsPopoverTrigger,
  CdsSelect,
  CdsSelectContent,
  CdsSelectItem,
  CdsSelectTrigger,
  CdsSelectValue,
  CdsToolbar,
  CdsToolbarButton,
} from '../../../packages/desktop/src/renderer/components/base/CDS';

afterEach(cleanup);

beforeAll(() => {
  // jsdom has no layout or pointer capture; these browser APIs are used by Radix.
  HTMLElement.prototype.scrollIntoView ??= vi.fn();
  HTMLElement.prototype.hasPointerCapture ??= () => false;
  HTMLElement.prototype.setPointerCapture ??= vi.fn();
  HTMLElement.prototype.releasePointerCapture ??= vi.fn();
});

describe('CDS overlays and keyboard navigation', () => {
  it('closes a dialog with Escape and restores focus to its trigger', async () => {
    const user = userEvent.setup();
    render(
      <CdsDialog>
        <CdsDialogTrigger asChild>
          <CdsButton>Open</CdsButton>
        </CdsDialogTrigger>
        <CdsDialogContent>
          <CdsDialogTitle>Settings</CdsDialogTitle>
          <CdsDialogDescription>Preferences</CdsDialogDescription>
          <CdsButton>Inside</CdsButton>
        </CdsDialogContent>
      </CdsDialog>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeVisible();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus();
  });

  it('does not open a dialog from a disabled trigger', async () => {
    render(
      <CdsDialog>
        <CdsDialogTrigger asChild>
          <CdsButton disabled>Open</CdsButton>
        </CdsDialogTrigger>
        <CdsDialogContent>
          <CdsDialogTitle>Settings</CdsDialogTitle>
          <CdsDialogDescription>Preferences</CdsDialogDescription>
        </CdsDialogContent>
      </CdsDialog>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('selects with the keyboard while skipping disabled items', async () => {
    const change = vi.fn();
    const user = userEvent.setup();
    render(
      <CdsSelect defaultValue='one' onValueChange={change}>
        <CdsSelectTrigger aria-label='Model'>
          <CdsSelectValue />
        </CdsSelectTrigger>
        <CdsSelectContent>
          <CdsSelectItem value='one'>One</CdsSelectItem>
          <CdsSelectItem value='two' disabled>
            Two
          </CdsSelectItem>
          <CdsSelectItem value='three'>Three</CdsSelectItem>
        </CdsSelectContent>
      </CdsSelect>
    );
    screen.getByRole('combobox').focus();
    await user.keyboard('{Enter}');
    await screen.findByRole('listbox');
    await user.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(change).toHaveBeenCalledWith('three'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('keeps a disabled select closed', async () => {
    render(
      <CdsSelect disabled>
        <CdsSelectTrigger aria-label='Model'>
          <CdsSelectValue />
        </CdsSelectTrigger>
        <CdsSelectContent>
          <CdsSelectItem value='one'>One</CdsSelectItem>
        </CdsSelectContent>
      </CdsSelect>
    );
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('dismisses a popover with Escape', async () => {
    const user = userEvent.setup();
    render(
      <CdsPopover>
        <CdsPopoverTrigger asChild>
          <CdsButton>Open</CdsButton>
        </CdsPopoverTrigger>
        <CdsPopoverContent aria-label='Actions'>Actions</CdsPopoverContent>
      </CdsPopover>
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await screen.findByRole('dialog');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('moves toolbar focus with arrow keys and skips disabled actions', async () => {
    const user = userEvent.setup();
    render(
      <CdsToolbar aria-label='Actions'>
        <CdsToolbarButton>First</CdsToolbarButton>
        <CdsToolbarButton disabled>Disabled</CdsToolbarButton>
        <CdsToolbarButton>Last</CdsToolbarButton>
      </CdsToolbar>
    );
    act(() => screen.getByRole('button', { name: 'First' }).focus());
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Last' })).toHaveFocus();
  });
});
