import { useTranslation } from 'react-i18next';
import { CdsButton } from '@renderer/components/base/CDS';
/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import type { IMessageToolCall } from '@/common/chat/chatLib';
import { normalizeToolCall } from '@/common/chat/normalizeToolCall';
import type { NormalizedToolStatus } from '@/common/chat/normalizeToolCall';
import FileChangesPanel from '@/renderer/components/base/FileChangesPanel';
import { useDiffPreviewHandlers } from '@/renderer/hooks/file/useDiffPreviewHandlers';
import { parseDiff } from '@/renderer/utils/file/diffUtils';
import { Badge } from '@arco-design/web-react';
import { ChevronDown as IconDown, ChevronRight as IconRight } from 'lucide-react';
import { createTwoFilesPatch } from 'diff';
import React, { useMemo, useState } from 'react';
import type { BadgeProps } from '@arco-design/web-react';
import './MessageToolGroupSummary.css';

const statusToBadge = (status: NormalizedToolStatus): BadgeProps['status'] => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'error':
      return 'error';
    case 'running':
      return 'processing';
    default:
      return 'default';
  }
};

const ReplacePreview: React.FC<{ message: IMessageToolCall }> = ({ message }) => {
  const file_path = message.content.args?.file_path || message.content.input?.file_path || '';
  const old_string = message.content.args?.old_string ?? message.content.input?.old_string ?? '';
  const new_string = message.content.args?.new_string ?? message.content.input?.new_string ?? '';

  const diffText = useMemo(() => {
    return createTwoFilesPatch(file_path, file_path, old_string, new_string, '', '', { context: 3 });
  }, [file_path, old_string, new_string]);

  const fileInfo = useMemo(() => parseDiff(diffText, file_path), [diffText, file_path]);
  const display_name = file_path.split(/[/\\]/).pop() || file_path;
  const { handleFileClick, handleDiffClick } = useDiffPreviewHandlers({ diffText, display_name, file_path });

  return (
    <FileChangesPanel
      title={fileInfo.file_name}
      files={[fileInfo]}
      onFileClick={handleFileClick}
      onDiffClick={handleDiffClick}
      defaultExpanded={true}
    />
  );
};

const MessageToolCall: React.FC<{ message: IMessageToolCall }> = ({ message }) => {
  const { t } = useTranslation();
  const { name } = message.content;
  const [expanded, setExpanded] = useState(false);

  if (name === 'replace' || name === 'Edit') {
    return <ReplacePreview message={message} />;
  }

  const normalized = normalizeToolCall(message);
  if (!normalized) {
    return <div className='text-t-primary'>{name}</div>;
  }

  const hasDetail = normalized.input || normalized.output;

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row text-t-secondary gap-12px items-center'>
        <Badge
          status={statusToBadge(normalized.status)}
          className={normalized.status === 'running' ? 'badge-breathing' : ''}
        />
        <CdsButton
          variant='ghost'
          aria-expanded={Boolean(hasDetail && expanded)}
          disabled={!hasDetail}
          className={
            'tool-detail-toggle flex-1 min-w-0' +
            (expanded ? ' break-all' : ' truncate') +
            (hasDetail ? ' cursor-pointer hover:text-t-primary' : '')
          }
          onClick={hasDetail ? () => setExpanded(!expanded) : undefined}
        >
          <span className='font-medium text-13px'>{normalized.name}</span>
          {normalized.description && <span className='m-l-4px opacity-80 text-13px'>{normalized.description}</span>}
        </CdsButton>
        {hasDetail && (
          <CdsButton
            variant='ghost'
            size='icon'
            aria-label={expanded ? t('common.collapse') : t('common.expand')}
            aria-expanded={expanded}
            className='flex-shrink-0'
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <IconDown size={12} strokeWidth={1.75} style={{ fontSize: 12 }} />
            ) : (
              <IconRight size={12} strokeWidth={1.75} style={{ fontSize: 12 }} />
            )}
          </CdsButton>
        )}
      </div>
      {expanded && hasDetail && (
        <div className='tool-detail-panel m-l-20px m-t-4px'>
          {normalized.input && (
            <div className='tool-detail-section'>
              <div className='tool-detail-label'>{t('tools.labels.arguments')}</div>
              <pre className='tool-detail-content'>{normalized.input}</pre>
            </div>
          )}
          {normalized.output && (
            <div className='tool-detail-section'>
              <div className='tool-detail-label'>{t('tools.labels.result')}</div>
              <pre className='tool-detail-content'>{normalized.output}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageToolCall;
