/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@arco-design/web-react';
import { ArrowLeft, LogOut, Moon, Settings, Sun } from 'lucide-react';
import classNames from 'classnames';
import { CdsButton } from '@renderer/components/base/CDS';
import type { SiderTooltipProps } from '@renderer/utils/ui/siderTooltip';

interface SiderFooterProps {
  isMobile: boolean;
  isSettings: boolean;
  collapsed?: boolean;
  theme: string;
  siderTooltipProps: SiderTooltipProps;
  onSettingsClick: () => void;
  onThemeToggle: () => void;
  showLogout?: boolean;
  onLogoutClick?: () => void;
}

const SiderFooter: React.FC<SiderFooterProps> = ({
  isMobile,
  isSettings,
  collapsed = false,
  theme,
  siderTooltipProps,
  onSettingsClick,
  onThemeToggle,
  showLogout = false,
  onLogoutClick,
}) => {
  const { t } = useTranslation();
  const settingsLabel = isSettings ? t('common.back') : t('common.settings');
  const themeLabel = theme === 'dark' ? t('settings.lightMode') : t('settings.darkMode');

  return (
    <div className='shrink-0 sider-footer mt-auto pt-8px pb-8px border-t border-solid border-[var(--cds-a2)] border-s-0 border-e-0 border-b-0'>
      <div className={classNames('flex', collapsed ? 'flex-col gap-2px' : 'items-center gap-2px')}>
        <Tooltip {...siderTooltipProps} content={settingsLabel} position='right'>
          <CdsButton
            variant='ghost'
            size={collapsed ? 'icon' : 'medium'}
            onClick={onSettingsClick}
            aria-label={settingsLabel}
            aria-current={isSettings ? 'page' : undefined}
            className={classNames(
              'group h-32px min-w-0 text-[var(--cds-tx2)] hover:text-[var(--cds-tx)]',
              collapsed ? 'w-full' : 'flex-1 justify-start gap-8px ps-10px pe-8px',
              isSettings && 'bg-[var(--cds-a2)] text-[var(--cds-tx)]',
              isMobile && 'sider-footer-btn-mobile'
            )}
          >
            {isSettings ? (
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden='true' />
            ) : (
              <Settings size={16} strokeWidth={1.75} aria-hidden='true' />
            )}
            {!collapsed && <span className='truncate text-14px font-[500]'>{settingsLabel}</span>}
          </CdsButton>
        </Tooltip>
        {showLogout && onLogoutClick && (
          <Tooltip {...siderTooltipProps} content={t('settings.googleLogout')} position='right'>
            <CdsButton
              variant='ghost'
              size={collapsed ? 'icon' : 'medium'}
              onClick={onLogoutClick}
              aria-label={t('settings.googleLogout')}
              className={classNames(
                'h-32px min-w-0 text-[var(--cds-tx2)]',
                collapsed ? 'w-full' : 'flex-1 justify-start gap-8px ps-10px pe-8px',
                isMobile && 'sider-footer-btn-mobile'
              )}
            >
              <LogOut size={16} strokeWidth={1.75} aria-hidden='true' />
              {!collapsed && <span className='truncate text-14px font-[500]'>{t('settings.googleLogout')}</span>}
            </CdsButton>
          </Tooltip>
        )}
        {isSettings && !collapsed && (
          <Tooltip {...siderTooltipProps} content={themeLabel} position='right'>
            <CdsButton
              variant='ghost'
              size='icon'
              onClick={onThemeToggle}
              data-testid='theme-toggle'
              aria-label={themeLabel}
              className={classNames('text-[var(--cds-tx2)]', isMobile && 'sider-footer-btn-mobile')}
            >
              {theme === 'dark' ? (
                <Sun size={16} strokeWidth={1.75} aria-hidden='true' />
              ) : (
                <Moon size={16} strokeWidth={1.75} aria-hidden='true' />
              )}
            </CdsButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default SiderFooter;
