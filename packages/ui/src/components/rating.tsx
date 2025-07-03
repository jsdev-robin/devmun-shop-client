import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  value: number;
  average?: number;
  displayMode?: 'compact' | 'stars';
  size?: number;
}

const formatCompactNumber = (value: number) => {
  return value >= 1000 ? `${(value / 1000).toFixed(value % 1000 >= 100 ? 1 : 0)}k` : value.toString();
};

const Rating: React.FC<RatingProps> = ({ value, average, displayMode = 'stars', size = 16 }) => {
  return displayMode === 'compact' ? (
    <div className="flex items-center gap-1 text-sm font-semibold">
      {average && <span className="text-[13px]">{average}</span>} <Star size={size} strokeWidth={0} className="fill-foreground" />{' '}
      {value && <span className="text-xs font-normal text-muted-foreground">({formatCompactNumber(value)})</span>}
    </div>
  ) : (
    <div className="relative">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={size} strokeWidth={0} className="fill-muted" />
        ))}
      </div>

      <div className="flex absolute top-0 left-0">
        {Array.from({ length: 5 }, (_, i) => {
          if (value >= i + 1) {
            return <Star key={i} size={size} strokeWidth={0} className="fill-yellow-500" />;
          } else if (value > i && value < i + 1) {
            return <StarHalf key={i} size={size} strokeWidth={0} className="fill-yellow-500" />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Rating;
