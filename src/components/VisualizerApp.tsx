'use client';

import AlgoSelector from './AlgoSelector';
import ArrayInput from './ArrayInput';
import ArrayVisualizer from './ArrayVisualizer';
import CodePanel from './CodePanel';
import Controls from './Controls';
import StepInfo from './StepInfo';
import ComplexityBadge from './ComplexityBadge';
import { ALGO_LABELS } from '@/lib/codeSnippets';
import { useVisualizerStore } from '@/store/visualizerStore';

export default function VisualizerApp() {
  const algo = useVisualizerStore(s => s.algo);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
            <span className="text-gray-900 font-black text-sm">S</span>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">SortViz</h1>
            <p className="text-xs text-gray-500">Sorting Algorithm Visualizer</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 font-mono hidden md:block">
          Algoritma &amp; Pemrograman · Universitas Jember
        </div>
      </header>

      {/* Algo selector */}
      <div className="border-b border-gray-800 px-6 py-2.5 flex items-center gap-4 shrink-0">
        <AlgoSelector />
        <div className="ml-auto text-sm font-semibold text-amber-400 hidden sm:block">
          {ALGO_LABELS[algo]}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: Visualization */}
        <div className="flex flex-col w-full lg:w-[55%] border-r border-gray-800 overflow-y-auto">
          <div className="flex-1 p-5 space-y-5">

            {/* Array input */}
            <section>
              <h2 className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">
                Input Array
              </h2>
              <ArrayInput />
            </section>

            {/* Visualizer */}
            <section>
              <h2 className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">
                Visualisasi
              </h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <ArrayVisualizer />
              </div>
            </section>

            {/* Step info */}
            <section>
              <h2 className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">
                Langkah Saat Ini
              </h2>
              <StepInfo />
            </section>

            {/* Controls */}
            <section>
              <Controls />
            </section>

          </div>
        </div>

        {/* RIGHT: Code + Complexity */}
        <div className="hidden lg:flex flex-col w-[45%]">

          {/* Code panel - takes most space */}
          <div className="flex-1 bg-gray-900/50 border-b border-gray-800 overflow-hidden">
            <CodePanel />
          </div>

          {/* Complexity */}
          <div className="p-4 shrink-0">
            <ComplexityBadge />
          </div>

        </div>
      </div>

      {/* Mobile: Code panel as bottom drawer hint */}
      <div className="lg:hidden border-t border-gray-800 bg-gray-900/80 p-3">
        <details className="group">
          <summary className="text-xs text-gray-400 font-mono cursor-pointer select-none flex items-center gap-2">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            Lihat Source Code C++
          </summary>
          <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-gray-700">
            <CodePanel />
          </div>
        </details>
        <div className="mt-3">
          <ComplexityBadge />
        </div>
      </div>
    </div>
  );
}
