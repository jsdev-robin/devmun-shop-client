import { cva } from 'class-variance-authority';

export const munCard = cva('', {
  variants: {
    focusRing: {
      default:
        'overflow-hidden transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background',
    },
    overlay: {
      default:
        'bg-transparent p-0 gap-0 relative flex flex-col justify-end bg-[linear-gradient(#0e0e0e00_48%,#0e0e0eab_100%)] h-full',
    },
  },
});
