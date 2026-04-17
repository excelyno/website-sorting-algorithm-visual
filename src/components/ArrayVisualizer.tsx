'use client';

import { AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/visualizerStore';
import ArrayBar from './ArrayBar';

const CONTAINER_HEIGHT = 200; // px — tinggi area bar
const MIN_BAR_HEIGHT = 12;    // px — bar minimum biar keliatan

export default function ArrayVisualizer() {
  const steps = useVisualizerStore(s => s.steps);
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex);

  const currentStep = steps[currentStepIndex];
  if (!currentStep) return null;

  const { bars } = currentStep;
  const maxValue = Math.max(...bars.map(b => b.value), 1);

  return (
    <div className="relative">
      {/* Phase badge */}
      {currentStep.phase && !['START', 'DONE'].includes(currentStep.phase) && (
        <div className="absolute top-0 right-0 z-10">
          <span className={`text-xs font-bold px-2 py-1 rounded font-mono ${
            currentStep.phase === 'DIVIDE'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
          }`}>
            FASE: {currentStep.phase}
          </span>
        </div>
      )}

      {/* Bar chart container — tinggi fixed dalam px */}
      <div
        className="flex items-end gap-2 px-2 pt-8"
        style={{ height: `${CONTAINER_HEIGHT + 32}px` }} // +32 for label space
      >
        <AnimatePresence mode="popLayout">
          {bars.map((bar) => {
            const heightPx = Math.max(
              Math.round((bar.value / maxValue) * CONTAINER_HEIGHT),
              MIN_BAR_HEIGHT
            );
            return (
              <ArrayBar
                key={bar.id}
                id={bar.id}
                value={bar.value}
                state={bar.state}
                heightPx={heightPx}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Index labels */}
      <div className="flex gap-2 px-2 mt-1">
        {bars.map((_, i) => (
          <div key={i} className="flex-1 text-center text-xs text-gray-600 font-mono">
            [{i}]
          </div>
        ))}
      </div>
    </div>
  );
}