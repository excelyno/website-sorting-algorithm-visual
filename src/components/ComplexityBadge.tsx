'use client';

import { useVisualizerStore } from '@/store/visualizerStore';
import { COMPLEXITY } from '@/lib/codeSnippets';

export default function ComplexityBadge() {
  const algo = useVisualizerStore(s => s.algo);
  const c = COMPLEXITY[algo];

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Kompleksitas</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-2">
          <p className="text-xs text-gray-500 mb-1">Best Case</p>
          <p className="text-sm font-mono font-bold text-emerald-400">{c.best}</p>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-2">
          <p className="text-xs text-gray-500 mb-1">Average Case</p>
          <p className="text-sm font-mono font-bold text-amber-400">{c.avg}</p>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-2">
          <p className="text-xs text-gray-500 mb-1">Worst Case</p>
          <p className="text-sm font-mono font-bold text-red-400">{c.worst}</p>
        </div>
        <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-2">
          <p className="text-xs text-gray-500 mb-1">Space</p>
          <p className="text-sm font-mono font-bold text-sky-400">{c.space}</p>
        </div>
      </div>
    </div>
  );
}
