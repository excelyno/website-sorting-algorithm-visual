'use client';

import { useVisualizerStore } from '@/store/visualizerStore';
import { BarState } from '@/lib/algorithms/types';

const LEGEND: { state: BarState; label: string; color: string }[] = [
  { state: 'comparing', label: 'Membandingkan', color: 'bg-amber-400' },
  { state: 'swapping',  label: 'Menukar/Memindah', color: 'bg-red-500' },
  { state: 'sorted',    label: 'Sudah terurut', color: 'bg-emerald-500' },
  { state: 'pivot',     label: 'Pivot / Min sementara', color: 'bg-violet-500' },
  { state: 'subarray',  label: 'Sub-array', color: 'bg-sky-400' },
  { state: 'merged',    label: 'Sudah digabung', color: 'bg-cyan-400' },
  { state: 'key',       label: 'Key (Insertion)', color: 'bg-yellow-300' },
];

export default function StepInfo() {
  const steps = useVisualizerStore(s => s.steps);
  const currentStepIndex = useVisualizerStore(s => s.currentStepIndex);

  const currentStep = steps[currentStepIndex];
  if (!currentStep) return null;

  // Detect which states are present in this step to show relevant legend
  const activeStates = new Set(currentStep.bars.map(b => b.state));
  const relevantLegend = LEGEND.filter(l => activeStates.has(l.state));

  return (
    <div className="space-y-2">
      {/* Current step description */}
      <div className="bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 min-h-[2.5rem] flex items-center">
        <p className="text-sm text-gray-200 font-mono">
          <span className="text-amber-400 mr-2">→</span>
          {currentStep.description}
        </p>
      </div>

      {/* Active legend */}
      {relevantLegend.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {relevantLegend.map(item => (
            <div key={item.state} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${item.color}`} />
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
