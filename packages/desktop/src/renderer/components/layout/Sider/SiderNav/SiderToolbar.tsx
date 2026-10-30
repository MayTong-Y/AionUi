/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@arco-design/web-react';
import { ListChecks, Plus } from 'lucide-react';
import classNames from 'classnames';
import { CdsButton } from '@renderer/components/base/CDS';
import type { SiderTooltipProps } from '@renderer/utils/ui/siderTooltip';
import styles from '../Sider.module.css';

interface SiderToolbarProps {
  isMobile: boolean;
  isBatchMode: boolean;
  collapsed: boolean;
  siderTooltipProps: SiderTooltipProps;
  onNewChat: () => void;
  onToggleBatchMode: () => void;
}

const SiderToolbar: React.FC<SiderToolbarProps> = ({
  isMobile,
  isBatchMode,
  collapsed,
  siderTooltipProps,
  onNewChat,
  onToggleBatchMode,
}) => {
  const { t } = useTranslation();

  if (collapsed) {
    return (
      <div className='shrink-0 flex flex-col items-center gap-2px w-full'>
        <Tooltip {...siderTooltipProps} content={t('conversation.welcome.newConversation')} position='right'>
          <CdsButton
            variant='ghost'
            size='icon'
            className={classNames(
              'w-full h-32px flex items-center justify-center cursor-pointer transition-colors text-[var(--cds-tx)] rd-8px hover:bg-[var(--cds-a1)] active:bg-[var(--cds-a2)]',
              styles.newChatTrigger
            )}
            onClick={onNewChat}
            aria-label={t('conversation.welcome.newConversation')}
          >
            <Plus size={16} strokeWidth={1.75} className={styles.newChatIcon} aria-hidden='true' />
          </CdsButton>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className='shrink-0 flex items-center gap-8px'>
      <Tooltip {...siderTooltipProps} content={t('conversation.welcome.newConversation')} position='right'>
        <CdsButton
          variant='ghost'
          className={classNames(
            styles.newChatTrigger,
            'h-32px flex-1 flex items-center justify-start gap-8px ps-10px pe-8px rd-8px cursor-pointer group transition-all bg-transparent text-[var(--cds-tx)] hover:bg-[var(--cds-a1)] active:bg-[var(--cds-a2)]',
            isMobile && 'sider-action-btn-mobile'
          )}
          onClick={onNewChat}
        >
          <span className='size-22px rd-full bg-[var(--cds-clay)] text-white flex items-center justify-center shrink-0'>
            <Plus size={14} strokeWidth={2.25} className={styles.newChatIcon} aria-hidden='true' />
          </span>
          <span className='collapsed-hidden text-[var(--cds-tx)] text-14px font-[500] leading-24px'>
            {t('conversation.welcome.newConversation')}
          </span>
        </CdsButton>
      </Tooltip>
      <Tooltip
        {...siderTooltipProps}
        content={isBatchMode ? t('conversation.history.batchModeExit') : t('conversation.history.batchManage')}
        position='right'
      >
        <CdsButton
          variant='ghost'
          size='icon'
          className={classNames(
            'size-28px rd-6px flex items-center justify-center cursor-pointer shrink-0 transition-colors border border-solid border-transparent text-[var(--cds-tx2)] hover:text-[var(--cds-tx)]',
            isMobile && 'sider-action-icon-btn-mobile',
            {
              'hover:bg-[var(--cds-a1)]': !isBatchMode,
              'bg-[var(--cds-clay-light)] border-[var(--cds-a2)] !text-[var(--cds-clay-text)]': isBatchMode,
            }
          )}
          onClick={onToggleBatchMode}
          aria-label={isBatchMode ? t('conversation.history.batchModeExit') : t('conversation.history.batchManage')}
        >
          <ListChecks size={16} strokeWidth={1.75} aria-hidden='true' />
        </CdsButton>
      </Tooltip>
    </div>
  );
};

export default SiderToolbar;
