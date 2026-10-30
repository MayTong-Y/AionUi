import React from 'react';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import WindowControls from '../../../packages/desktop/src/renderer/components/layout/WindowControls';

const bridge = vi.hoisted(() => ({
  isMaximized: vi.fn(),
  minimize: vi.fn(),
  maximize: vi.fn(),
  unmaximize: vi.fn(),
  close: vi.fn(),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
}));

vi.mock('@/common', () => ({
  ipcBridge: {
    windowControls: {
      isMaximized: { invoke: bridge.isMaximized },
      minimize: { invoke: bridge.minimize },
      maximize: { invoke: bridge.maximize },
      unmaximize: { invoke: bridge.unmaximize },
      close: { invoke: bridge.close },
      maximizedChanged: { on: bridge.subscribe },
    },
  },
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

afterEach(cleanup);

beforeEach(() => {
  vi.clearAllMocks();
  bridge.isMaximized.mockResolvedValue(false);
  bridge.subscribe.mockReturnValue(bridge.unsubscribe);
});

describe('shell window controls', () => {
  it('sends minimize, maximize, and close through the existing bridge', async () => {
    render(<WindowControls />);
    await userEvent.click(screen.getByRole('button', { name: 'update.minimize' }));
    await userEvent.click(screen.getByRole('button', { name: 'common.expandMore' }));
    await userEvent.click(screen.getByRole('button', { name: 'common.close' }));
    expect(bridge.minimize).toHaveBeenCalledOnce();
    expect(bridge.maximize).toHaveBeenCalledOnce();
    expect(bridge.close).toHaveBeenCalledOnce();
  });

  it('restores a maximized window after the current state arrives', async () => {
    bridge.isMaximized.mockResolvedValue(true);
    render(<WindowControls />);
    await userEvent.click(await screen.findByRole('button', { name: 'common.collapse' }));
    expect(bridge.unmaximize).toHaveBeenCalledOnce();
    expect(bridge.maximize).not.toHaveBeenCalled();
  });

  it('updates the restore action when the window changes maximized state', async () => {
    render(<WindowControls />);
    await act(async () => {
      await Promise.resolve();
    });
    const onChanged = bridge.subscribe.mock.calls[0]?.[0] as (event: { is_maximized: boolean }) => void;
    act(() => onChanged({ is_maximized: true }));
    await userEvent.click(screen.getByRole('button', { name: 'common.collapse' }));
    expect(bridge.unmaximize).toHaveBeenCalledOnce();
  });

  it('hides unavailable controls when the desktop bridge fails', async () => {
    bridge.isMaximized.mockRejectedValue(new Error('unavailable'));
    render(<WindowControls />);
    await waitFor(() => expect(screen.queryAllByRole('button')).toHaveLength(0));
    expect(bridge.unsubscribe).not.toHaveBeenCalled();
  });
});
