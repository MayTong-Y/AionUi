import { CdsButton } from '@renderer/components/base/CDS';
/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

import { Message } from '@arco-design/web-react';
import { Copy, ChevronDown as Down, ChevronUp as Up } from 'lucide-react';
import katex from 'katex';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { copyText } from '@/renderer/utils/ui/clipboard';
import MermaidBlock from './MermaidBlock';
import WavedromBlock from './WavedromBlock';
import { formatCode, getDiffLineStyle } from './markdownUtils';

const PREVIEW_LINES = 3;
// code span: font-size 13px, line-height 20px (per ShadowView injection)
const CODE_LINE_HEIGHT = 20;
// SyntaxHighlighter pre padding: 0.5em top + 0.5em bottom ≈ 13px each side
const CODE_PADDING_VERTICAL = 13;
const COLLAPSED_HEIGHT = PREVIEW_LINES * CODE_LINE_HEIGHT + CODE_PADDING_VERTICAL;

type CodeBlockProps = {
  children: string;
  className?: string;
  node?: unknown;
  hiddenCodeCopyButton?: boolean;
  codeStyle?: React.CSSProperties;
  // Enable drag-to-pan + zoom on rendered diagrams (Mermaid, WaveDrom). Chat
  // messages and the preview panel both opt in; other surfaces keep diagrams
  // static.
  diagramPanZoom?: boolean;
  [key: string]: unknown;
};

function CodeBlock(props: CodeBlockProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(
    () => (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light'
  );

  React.useEffect(() => {
    const update = () => {
      setCurrentTheme((document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light');
    };
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const toggleExpanded = () => {
    const willCollapse = expanded;
    setExpanded((v) => !v);
    if (willCollapse && containerRef.current) {
      requestAnimationFrame(() => {
        containerRef.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      });
    }
  };

  const {
    children,
    className,
    node: _node,
    hiddenCodeCopyButton: _h,
    codeStyle: _c,
    diagramPanZoom: _dpz,
    ...rest
  } = props;
  const match = /language-(\w+)/.exec(className || '');
  const language = match?.[1] || 'text';

  // KaTeX math blocks
  if (language === 'latex' || language === 'math' || language === 'tex') {
    const latexSource = String(children).replace(/\n$/, '');
    const isFullDocument = /\\(documentclass|begin\{document\}|usepackage)\b/.test(latexSource);
    if (!isFullDocument) {
      try {
        const html = katex.renderToString(latexSource, { displayMode: true, throwOnError: false });
        return <div className='katex-display' dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        // fall through
      }
    }
  }

  if (language === 'mermaid') {
    return <MermaidBlock code={formatCode(children)} style={props.codeStyle} enablePanZoom={props.diagramPanZoom} />;
  }

  if (language === 'wavedrom' || language === 'wavejson') {
    return <WavedromBlock code={formatCode(children)} style={props.codeStyle} enablePanZoom={props.diagramPanZoom} />;
  }

  // Inline code (single line)
  if (!String(children).includes('\n')) {
    return (
      <code {...rest} className={className} style={{ fontWeight: 'bold' }}>
        {children}
      </code>
    );
  }

  const isDiff = language === 'diff';
  const formattedContent = formatCode(children);
  const totalLines = formattedContent.split('\n').length;
  const canCollapse = totalLines > PREVIEW_LINES;
  const codeTheme = currentTheme === 'dark' ? vs2015 : vs;
  const diffLines = isDiff ? formattedContent.split('\n') : [];
  const isDark = currentTheme === 'dark';

  const handleCopy = () => {
    void copyText(formattedContent)
      .then(() => {
        try {
          Message.success(t('common.copySuccess'));
        } catch {
          /* Shadow DOM portal may fail silently */
        }
      })
      .catch(() => {
        try {
          Message.error(t('common.copyFailed'));
        } catch {
          /* ignore */
        }
      });
  };

  const iconFill = 'var(--cds-tx2)';
  const footerTextColor = 'var(--cds-tx3)';
  const borderColor = 'var(--cds-a2)';
  const bgColor = 'var(--cds-code-bg)';

  return (
    <div
      ref={containerRef}
      // Code is inherently left-to-right; keep it that way under an RTL document.
      dir='ltr'
      style={{ width: '100%', minWidth: 0, maxWidth: '100%', ...props.codeStyle }}
      className='group'
    >
      <div
        style={{
          backgroundColor: bgColor,
          borderRadius: 'var(--cds-r-code)',
          boxShadow: 'inset 0 0 0 1px var(--cds-a2)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
          }}
        >
          <span style={{ color: footerTextColor, fontSize: '12px', lineHeight: '16px' }}>
            {language.toLocaleLowerCase()}
          </span>
          {/* Buttons: always visible on touch devices, hover-only on pointer devices */}
          <div
            className='opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity'
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {canCollapse && (
              <CdsButton
                variant='ghost'
                size='icon'
                aria-label={expanded ? t('common.collapse') : t('common.expand')}
                title={expanded ? t('common.collapse') : t('common.expand')}
                aria-expanded={expanded}
                onClick={toggleExpanded}
                style={{ color: iconFill }}
              >
                {expanded ? <Up strokeWidth={1.75} size={14} /> : <Down strokeWidth={1.75} size={14} />}
              </CdsButton>
            )}
            <CdsButton
              variant='ghost'
              size='icon'
              aria-label={t('common.copy')}
              title={t('common.copy')}
              onClick={handleCopy}
              style={{ color: iconFill }}
            >
              <Copy strokeWidth={1.75} size={14} />
            </CdsButton>
          </div>
        </div>

        {/* Code content — always full content, clipped by maxHeight when collapsed */}
        <div
          style={{
            maxHeight: canCollapse && !expanded ? `${COLLAPSED_HEIGHT}px` : 'none',
            overflowY: 'hidden',
            overflowX: 'visible',
          }}
        >
          <SyntaxHighlighter
            children={formattedContent}
            language={language}
            style={codeTheme}
            PreTag='div'
            wrapLines={isDiff}
            lineProps={
              isDiff
                ? (lineNumber: number) => ({
                    style: {
                      display: 'block',
                      ...getDiffLineStyle(diffLines[lineNumber - 1] || '', isDark),
                    },
                  })
                : undefined
            }
            customStyle={{
              margin: 0,
              padding: '0 12px 8px',
              borderRadius: 0,
              border: 'none',
              background: 'transparent',
              color: 'var(--text-primary)',
              overflowX: 'auto',
              maxWidth: '100%',
            }}
            codeTagProps={{
              style: {
                color: 'var(--text-primary)',
                background: 'transparent',
              },
            }}
          />
        </div>

        {/* Footer */}
        {canCollapse && (
          <CdsButton
            variant='ghost'
            fullWidth
            aria-expanded={expanded}
            style={{
              display: 'flex',
              height: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '6px 12px',
              cursor: 'pointer',
              gap: '4px',
              borderTop: `1px solid ${borderColor}`,
            }}
            onClick={toggleExpanded}
          >
            <span style={{ color: footerTextColor, fontSize: '12px' }}>
              {expanded ? t('common.collapse') : t('common.viewMoreLines', { count: totalLines - PREVIEW_LINES })}
            </span>
            {expanded ? (
              <Up strokeWidth={1.75} size='12' color={footerTextColor} />
            ) : (
              <Down strokeWidth={1.75} size='12' color={footerTextColor} />
            )}
          </CdsButton>
        )}
      </div>
    </div>
  );
}

export default CodeBlock;
