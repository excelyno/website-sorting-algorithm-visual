'use client';

import { useEffect, useRef } from 'react';
import { useVisualizerStore } from '@/store/visualizerStore';
import { CODE_SNIPPETS } from '@/lib/codeSnippets';

export default function CodePanel() {
  const algo = useVisualizerStore(s => s.algo);
  const steps = useVisualizerStore(s => s.steps);
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[currentStepIndex];
  const code = CODE_SNIPPETS[algo];
  const lines = code.split('\n');
  const highlightLines = currentStep?.highlightLines ?? [];

  // Auto-scroll to highlighted line
  useEffect(() => {
    if (highlightLines.length === 0 || !containerRef.current) return;
    const lineEl = containerRef.current.querySelector(
      `[data-line="${highlightLines[0]}"]`
    );
    if (lineEl) {
      lineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightLines]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700/50">
        <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">
          source.cpp
        </span>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto font-mono text-sm leading-6 py-2"
      >
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const isHighlighted = highlightLines.includes(lineNum);

          return (
            <div
              key={lineNum}
              data-line={lineNum}
              className={`flex group transition-colors duration-150 ${
                isHighlighted
                  ? 'bg-amber-400/15 border-l-2 border-amber-400'
                  : 'border-l-2 border-transparent hover:bg-white/5'
              }`}
            >
              {/* Line number */}
              <span className={`select-none w-10 text-right pr-4 shrink-0 text-xs pt-0.5 ${
                isHighlighted ? 'text-amber-400 font-bold' : 'text-gray-600'
              }`}>
                {lineNum}
              </span>

              {/* Code */}
              <span className={`pr-4 whitespace-pre ${
                isHighlighted ? 'text-amber-100' : 'text-gray-300'
              }`}>
                {line || ' '}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
