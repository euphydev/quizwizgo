import * as React from 'react';

interface FlipTileProps {
  value: number;
  digits?: number;
  label?: string;
  accent?: 'marquee' | 'mint';
}

const FlipTile: React.FC<FlipTileProps> = ({
  value,
  digits = 2,
  label,
  accent = 'marquee',
}) => {
  const padded = Math.max(0, value).toString().padStart(digits, '0');
  const chars = padded.split('');
  const accentClass = accent === 'mint' ? 'text-mint' : 'text-marquee';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1" aria-hidden="true">
        {chars.map((char, position) => (
          <div
            key={position}
            className="flex h-12 w-9 items-center justify-center overflow-hidden rounded-md bg-ink-2 shadow-tile sm:h-14 sm:w-11"
          >
            <span
              key={char}
              className={`flip-tile-digit font-display text-3xl font-bold tabular-nums sm:text-4xl ${accentClass}`}
            >
              {char}
            </span>
          </div>
        ))}
      </div>
      {label && (
        <span className="font-sans text-xs text-slate">{label}</span>
      )}
      <span className="sr-only" role="status" aria-live="polite">
        {value}
        {label ? ` ${label}` : ''}
      </span>
    </div>
  );
};

export { FlipTile };
