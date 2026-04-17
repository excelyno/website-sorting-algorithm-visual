'use client';

import { useState } from 'react';
import { useVisualizerStore } from '@/store/visualizerStore';
import { PRESETS } from '@/lib/codeSnippets';

export default function ArrayInput() {
  const inputArray = useVisualizerStore(s => s.inputArray);
  const setInputArray = useVisualizerStore(s => s.setInputArray);
  const [raw, setRaw] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const parts = raw.split(/[\s,]+/).filter(Boolean);
    const nums = parts.map(Number);

    if (nums.some(isNaN)) {
      setError('Input harus berupa angka, pisahkan dengan koma atau spasi');
      return;
    }
    if (nums.length < 2 || nums.length > 12) {
      setError('Jumlah elemen harus antara 2 dan 12');
      return;
    }
    if (nums.some(n => n < 1 || n > 99)) {
      setError('Nilai harus antara 1 dan 99');
      return;
    }

    setError('');
    setRaw('');
    setInputArray(nums);
  };

  const handleRandomize = () => {
    const n = Math.floor(Math.random() * 5) + 4; // 4–8 elements
    const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 20) + 1);
    setError('');
    setRaw('');
    setInputArray(arr);
  };

  return (
    <div className="space-y-2">
      {/* Current array display */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500 font-mono">Array:</span>
        <div className="flex gap-1 flex-wrap">
          {inputArray.map((v, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-700 rounded text-xs font-mono text-amber-300">
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Preset buttons */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs text-gray-500 self-center">Preset:</span>
        <button
          onClick={() => setInputArray(PRESETS.soal1)}
          className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300 font-mono border border-gray-600 transition-colors"
        >
          Soal 1: [{PRESETS.soal1.join(', ')}]
        </button>
        <button
          onClick={() => setInputArray(PRESETS.soal2)}
          className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300 font-mono border border-gray-600 transition-colors"
        >
          Soal 2: [{PRESETS.soal2.join(', ')}]
        </button>
        <button
          onClick={handleRandomize}
          className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 text-gray-300 font-mono border border-gray-600 transition-colors"
        >
          🎲 Random
        </button>
      </div>

      {/* Custom input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={raw}
          onChange={e => setRaw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Contoh: 5, 3, 8, 1, 4"
          className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm font-mono text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
        />
        <button
          onClick={handleSubmit}
          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm rounded-lg transition-colors"
        >
          Set
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-400 font-mono">{error}</p>
      )}
    </div>
  );
}
