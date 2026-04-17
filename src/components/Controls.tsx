'use client';

import { useEffect, useRef } from 'react';
import { useVisualizerStore } from '@/store/visualizerStore';

const SPEED_OPTIONS = [
  { label: '0.5×', ms: 1600 },
  { label: '1×',   ms: 800 },
  { label: '2×',   ms: 400 },
  { label: '4×',   ms: 200 },
];

export default function Controls() {
  const isPlaying = useVisualizerStore(s => s.isPlaying);
  const speed = useVisualizerStore(s => s.speed);
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex);
  const steps = useVisualizerStore(s => s.steps);
  const play = useVisualizerStore(s => s.play);
  const pause = useVisualizerStore(s => s.pause);
  const nextStep = useVisualizerStore(s => s.nextStep);
  const prevStep = useVisualizerStore(s => s.prevStep);
  const reset = useVisualizerStore(s => s.reset);
  const setSpeed = useVisualizerStore(s => s.setSpeed);

  const isFinished = currentStepIndex >= steps.length - 1;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    if (isFinished) {
      pause();
      return;
    }
    timerRef.current = setTimeout(nextStep, speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, speed, isFinished]);

  const totalSteps = steps.length;
  const progress = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="relative h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step counter */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 font-mono">
          Step {currentStepIndex + 1} / {totalSteps}
        </span>
        {/* Speed selector */}
        <div className="flex gap-1">
          {SPEED_OPTIONS.map(opt => (
            <button
              key={opt.ms}
              onClick={() => setSpeed(opt.ms)}
              className={`px-2 py-0.5 text-xs rounded font-mono transition-colors ${
                speed === opt.ms
                  ? 'bg-amber-400 text-gray-900 font-bold'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center gap-3">
        {/* Reset */}
        <button
          onClick={reset}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
          title="Reset"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>

        {/* Prev step */}
        <button
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Langkah sebelumnya"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        {/* Play / Pause */}
        <button
          onClick={isPlaying ? pause : play}
          disabled={isFinished && !isPlaying}
          className={`p-3 rounded-xl transition-all shadow-lg ${
            isPlaying
              ? 'bg-amber-400 hover:bg-amber-300 text-gray-900 shadow-amber-400/30'
              : isFinished
              ? 'bg-emerald-500 text-white shadow-emerald-500/30 cursor-default'
              : 'bg-amber-400 hover:bg-amber-300 text-gray-900 shadow-amber-400/30'
          }`}
          title={isPlaying ? 'Pause' : isFinished ? 'Selesai!' : 'Play'}
        >
          {isFinished ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          ) : isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Next step */}
        <button
          onClick={nextStep}
          disabled={isFinished}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Langkah berikutnya"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
          </svg>
        </button>

        {/* Go to end */}
        <button
          onClick={() => useVisualizerStore.getState().setInputArray(useVisualizerStore.getState().inputArray)}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
          title="Shuffle / Generate baru"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
