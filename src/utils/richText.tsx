import React from 'react';

/**
 * Parses markdown-like inline formatting:
 * **bold** -> <strong>bold</strong>
 * *italic* or _italic_ -> <em>italic</em>
 * `code` -> <code>code</code>
 * Retains normal text safely without danger of raw HTML injection.
 */
export function formatRichText(text?: string | null): React.ReactNode {
  if (!text) return null;

  // Split lines if multiline text
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIdx) => {
        // Parse inline tokens: **bold**, *italic*, _italic_, `code`
        const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`)/g;
        const parts = line.split(regex);

        const renderedLine = parts.map((part, partIdx) => {
          if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
            return (
              <strong key={partIdx} className="font-bold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (
            (part.startsWith('*') && part.endsWith('*') && part.length >= 2) ||
            (part.startsWith('_') && part.endsWith('_') && part.length >= 2)
          ) {
            return (
              <em key={partIdx} className="italic">
                {part.slice(1, -1)}
              </em>
            );
          }
          if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
            return (
              <code key={partIdx} className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[90%]">
                {part.slice(1, -1)}
              </code>
            );
          }
          return <React.Fragment key={partIdx}>{part}</React.Fragment>;
        });

        return (
          <React.Fragment key={lineIdx}>
            {renderedLine}
            {lineIdx < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
}

/**
 * Formats a list of bullet points or paragraph text.
 * If text starts with bullet indicators (-, *, •) or contains multiple lines,
 * it parses them properly.
 */
export function formatRichBullets(bullets?: string[] | null): React.ReactNode {
  if (!bullets || bullets.length === 0) return null;

  return bullets.map((bullet, idx) => (
    <React.Fragment key={idx}>
      {formatRichText(bullet)}
    </React.Fragment>
  ));
}
