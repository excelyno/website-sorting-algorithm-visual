'use client';

import { motion } from 'framer-motion';
import { BarState } from '@/lib/algorithms/types';

const COLOR_MAP: Record<BarState, string> = {
  default:   'bg-slate-500 border-slate-400',
  comparing: 'bg-amber-400 border-amber-300 shadow-amber-400/50 shadow-lg',
  swapping:  'bg-red-500 border-red-400 shadow-red-500/50 shadow-lg',
  sorted:    'bg-emerald-500 border-emerald-400 shadow-emerald-500/30 shadow-md',
  pivot:     'bg-violet-500 border-violet-400 shadow-violet-500/50 shadow-lg',
  subarray:  'bg-sky-400 border-sky-300 shadow-sky-400/40 shadow-md',
  merged:    'bg-cyan-400 border-cyan-300 shadow-cyan-400/40 shadow-md',
  key:       'bg-yellow-300 border-yellow-200 shadow-yellow-300/50 shadow-lg',
};

const LABEL_COLOR: Record<BarState, string> = {
  default:   'text-slate-200',
  comparing: 'text-amber-900',
  swapping:  'text-red-100',
  sorted:    'text-emerald-900',
  pivot:     'text-violet-100',
  subarray:  'text-sky-900',
  merged:    'text-cyan-900',
  key:       'text-yellow-900',
};

interface ArrayBarProps {
  id: string;
  value: number;
  state: BarState;
  heightPx: number; // tinggi dalam PIXEL, bukan persen
}

export default function ArrayBar({ id, value, state, heightPx }: ArrayBarProps) {
  return (
    <motion.div
      layoutId={id}
      layout
      className="flex flex-col items-center justify-end flex-1 min-w-0"
      transition={{
        layout: { type: 'spring', stiffness: 280, damping: 28 },
      }}
    >
      {/* Value label */}
      <motion.span
        className={`text-xs font-bold mb-1 font-mono ${LABEL_COLOR[state]}`}
        layout="position"
      >
        {value}
      </motion.span>

      {/* Bar — pakai heightPx langsung */}
      <motion.div
        className={`w-full rounded-t-md border-t border-x transition-colors duration-150 ${COLOR_MAP[state]}`}
        style={{ height: `${heightPx}px` }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      />
    </motion.div>
  );
}