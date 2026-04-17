'use client';

import { useVisualizerStore } from '@/store/visualizerStore';
import { AlgoName } from '@/lib/algorithms/types';
import { ALGO_LABELS } from '@/lib/codeSnippets';

const ALGOS: AlgoName[] = ['bubble', 'insertion', 'selection', 'merge', 'quick'];

export default function AlgoSelector() {
  const algo = useVisualizerStore(s => s.algo);
  const setAlgo = useVisualizerStore(s => s.setAlgo);

  return (
    <div className="flex gap-1 flex-wrap">
      {ALGOS.map((a) => (
        <button
          key={a}
          onClick={() => setAlgo(a)}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
            algo === a
              ? 'bg-amber-400 text-gray-900 shadow-md shadow-amber-400/20'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 border border-gray-700'
          }`}
        >
          {ALGO_LABELS[a]}
        </button>
      ))}
    </div>
  );
}
