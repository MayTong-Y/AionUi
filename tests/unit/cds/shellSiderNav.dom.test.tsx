import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SiderAssistantEntry from '@renderer/components/layout/Sider/SiderNav/SiderAssistantEntry';
import SiderScheduledEntry from '@renderer/components/layout/Sider/SiderNav/SiderScheduledEntry';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

afterEach(cleanup);

describe('collapsed sider navigation', () => {
  it('keeps the assistants route available as an accessible button', () => {
    const onClick = vi.fn();
    render(<SiderAssistantEntry isMobile={false} isActive collapsed siderTooltipProps={{}} onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'settings.assistants' });
    expect(button).toHaveAttribute('aria-current', 'page');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('keeps scheduled tasks available when the route is inactive', () => {
    const onClick = vi.fn();
    render(
      <SiderScheduledEntry isMobile={false} isActive={false} collapsed siderTooltipProps={{}} onClick={onClick} />
    );

    const button = screen.getByRole('button', { name: 'cron.scheduledTasks' });
    expect(button).not.toHaveAttribute('aria-current');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
