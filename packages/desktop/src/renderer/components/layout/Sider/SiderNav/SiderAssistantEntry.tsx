/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@arco-design/web-react';
import { Blocks } from 'lucide-react';
import classNames from 'classnames';
import { CdsButton } from '@renderer/components/base/CDS';
import type { SiderTooltipProps } from '@renderer/utils/ui/siderTooltip';

interface SiderAssistantEntryProps {
  isMobile: boolean;
  isActive: boolean;
  collapsed: boolean;
  siderTooltipProps: SiderTooltipProps;
  onClick: () => void;
}

const SiderAssistantEntry: React.FC<SiderAssistantEntryProps> = ({
  isMobile,
  isActive,
  collapsed,
  siderTooltipProps,
  onClick,
}) => {
  const { t } = useTranslation();

  if (collapsed) {
    return (
      <Tooltip {...siderTooltipProps} content={t('settings.assistants')} position='right'>
        <CdsButton
          variant='ghost'
          size='icon'
          className={classNames(
            'w-full h-32px flex items-center justify-center cursor-pointer transition-colors rd-8px text-[var(--cds-tx2)]',
            isActive ? 'bg-[var(--cds-a2)] text-[var(--cds-tx)]' : 'hover:bg-[var(--cds-a1)] active:bg-[var(--cds-a2)]'
          )}
          onClick={onClick}
          aria-label={t('settings.assistants')}
          aria-current={isActive ? 'page' : undefined}
        >
          <Blocks size={16} strokeWidth={1.75} aria-hidden='true' />
        </CdsButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip {...siderTooltipProps} content={t('settings.assistants')} position='right'>
      <CdsButton
        variant='ghost'
        className={classNames(
          'box-border group h-32px w-full flex items-center justify-start gap-8px ps-10px pe-8px rd-8px cursor-pointer shrink-0 transition-all text-[var(--cds-tx2)]',
          isMobile && 'sider-action-btn-mobile',
          isActive ? 'bg-[var(--cds-a2)] text-[var(--cds-tx)]' : 'hover:bg-[var(--cds-a1)] active:bg-[var(--cds-a2)]'
        )}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className='size-22px flex items-center justify-center shrink-0'>
          <Blocks size={16} strokeWidth={1.75} aria-hidden='true' />
        </span>
        <span className='collapsed-hidden text-14px font-[500] leading-24px'>{t('settings.assistants')}</span>
      </CdsButton>
    </Tooltip>
  );
};

export default SiderAssistantEntry;
