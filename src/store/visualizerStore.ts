import { create } from 'zustand';
import { AlgoName, Step } from '@/lib/algorithms/types';
import { generateBubbleSortSteps } from '@/lib/algorithms/bubbleSort';
import { generateInsertionSortSteps } from '@/lib/algorithms/insertionSort';
import { generateSelectionSortSteps } from '@/lib/algorithms/selectionSort';
import { generateMergeSortSteps } from '@/lib/algorithms/mergeSort';
import { generateQuickSortSteps } from '@/lib/algorithms/quickSort';
import { PRESETS } from '@/lib/codeSnippets';

const GENERATORS = {
  bubble: generateBubbleSortSteps,
  insertion: generateInsertionSortSteps,
  selection: generateSelectionSortSteps,
  merge: generateMergeSortSteps,
  quick: generateQuickSortSteps,
};

interface VisualizerState {
  algo: AlgoName;
  inputArray: number[];
  steps: Step[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number; // ms per step

  // Computed
  currentStep: Step | null;
  isFinished: boolean;

  // Actions
  setAlgo: (algo: AlgoName) => void;
  setInputArray: (arr: number[]) => void;
  generateSteps: () => void;
  play: () => void;
  pause: () => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  setSpeed: (ms: number) => void;
}

export const useVisualizerStore = create<VisualizerState>((set, get) => {
  const buildSteps = (algo: AlgoName, input: number[]): Step[] => {
    return GENERATORS[algo]([...input]);
  };

  const initialAlgo: AlgoName = 'bubble';
  const initialInput = PRESETS.soal1;
  const initialSteps = buildSteps(initialAlgo, initialInput);

  return {
    algo: initialAlgo,
    inputArray: initialInput,
    steps: initialSteps,
    currentStepIndex: 0,
    isPlaying: false,
    speed: 800,

    currentStep: null,
    isFinished: false,

    setAlgo: (algo) => {
      const { inputArray } = get();
      const steps = buildSteps(algo, inputArray);
      set({ algo, steps, currentStepIndex: 0, isPlaying: false });
    },

    setInputArray: (arr) => {
      const { algo } = get();
      const steps = buildSteps(algo, arr);
      set({ inputArray: arr, steps, currentStepIndex: 0, isPlaying: false });
    },

    generateSteps: () => {
      const { algo, inputArray } = get();
      const steps = buildSteps(algo, inputArray);
      set({ steps, currentStepIndex: 0, isPlaying: false });
    },

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),

    nextStep: () => {
      const { currentStepIndex, steps } = get();
      if (currentStepIndex < steps.length - 1) {
        set({ currentStepIndex: currentStepIndex + 1 });
      } else {
        set({ isPlaying: false });
      }
    },

    prevStep: () => {
      const { currentStepIndex } = get();
      if (currentStepIndex > 0) {
        set({ currentStepIndex: currentStepIndex - 1, isPlaying: false });
      }
    },

    reset: () => {
      set({ currentStepIndex: 0, isPlaying: false });
    },

    setSpeed: (ms) => set({ speed: ms }),
  };
});
