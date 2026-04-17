# Sorting Algorithm Visualizer — Technical Specification

## Project Overview
Interactive web app untuk memvisualisasikan 5 algoritma sorting (Bubble, Insertion, Selection, Merge, Quick Sort) dengan animasi blok yang sinkron dengan highlight kode C++.

---

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **State Management**: Zustand
- **Animation**: Framer Motion (layout animations untuk swap blok)
- **Styling**: Tailwind CSS
- **Syntax Highlight**: react-syntax-highlighter (Prism, tema dracula/dark)
- **Font**: JetBrains Mono (kode), Geist / Outfit (UI)

---

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Entry point, render <VisualizerApp />
│   └── globals.css
├── components/
│   ├── VisualizerApp.tsx           # Root layout: sidebar + main content
│   ├── AlgoSelector.tsx            # Tab/pill selector: 5 algoritma
│   ├── ArrayInput.tsx              # Input custom array + preset buttons
│   ├── ArrayVisualizer.tsx         # Bar chart blok dengan Framer Motion
│   ├── ArrayBar.tsx                # Single bar component (warna state-based)
│   ├── CodePanel.tsx               # Syntax-highlighted C++ dengan line highlight
│   ├── StepInfo.tsx                # Keterangan langkah saat ini
│   ├── Controls.tsx                # Play/Pause/Prev/Next/Reset + speed slider
│   └── ComplexityBadge.tsx         # Badge O(n), O(n²) dll
├── lib/
│   ├── algorithms/
│   │   ├── types.ts                # Types: Step, BarState, AlgoName
│   │   ├── bubbleSort.ts           # Returns Step[]
│   │   ├── insertionSort.ts
│   │   ├── selectionSort.ts
│   │   ├── mergeSort.ts
│   │   └── quickSort.ts
│   ├── codeSnippets.ts             # C++ source strings per algo
│   └── lineMapping.ts              # Mapping step → baris kode yang di-highlight
└── store/
    └── visualizerStore.ts          # Zustand store
```

---

## Data Model

### Types (`lib/algorithms/types.ts`)
```typescript
export type AlgoName = 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';

export type BarState =
  | 'default'      // abu-abu normal
  | 'comparing'    // kuning — sedang dibandingkan
  | 'swapping'     // merah/oranye — sedang ditukar/dipindahkan
  | 'sorted'       // hijau — posisi final
  | 'pivot'        // ungu — pivot (Quick Sort)
  | 'subarray'     // biru muda — sub-array aktif (Merge Sort)
  | 'merged'       // cyan — sudah digabung (Merge Sort)
  | 'key'          // kuning terang — "key" yang sedang dipegang (Insertion Sort)

export interface ArrayBar {
  value: number;
  state: BarState;
  id: string;       // unique ID untuk Framer Motion layoutId
}

export interface Step {
  bars: ArrayBar[];           // snapshot array di langkah ini
  highlightLines: number[];   // line numbers C++ yang di-highlight (1-indexed)
  description: string;        // teks keterangan ("Tukar [0]↔[1]", dll)
  phase?: string;             // opsional: "DIVIDE" | "MERGE" untuk Merge Sort
}
```

---

## Zustand Store (`store/visualizerStore.ts`)

```typescript
interface VisualizerState {
  // Config
  algo: AlgoName;
  inputArray: number[];

  // Playback
  steps: Step[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;             // ms per step: 200 | 500 | 1000 | 2000

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
```

**Computed dari store:**
- `currentStep` = `steps[currentStepIndex]`
- `isFinished` = `currentStepIndex === steps.length - 1`

---

## Algorithm Step Generator

Setiap file di `lib/algorithms/` mengekspor satu fungsi:

```typescript
export function generateBubbleSortSteps(input: number[]): Step[]
```

Fungsi ini men-simulate algoritma dan setiap kali ada perubahan state (compare, swap, mark sorted), push satu `Step` baru ke array. Setiap `Step` berisi:
1. Snapshot `bars[]` lengkap (deep copy)
2. `highlightLines[]` — baris C++ mana yang aktif
3. `description` — teks penjelasan Bahasa Indonesia

### Contoh Bubble Sort:
```typescript
// r=0, i=0 → comparing step
steps.push({
  bars: snapshot(bars, { comparing: [0, 1] }),
  highlightLines: [16, 17],   // baris: if (data[i] > data[i+1])
  description: `Bandingkan a[0]=7 dan a[1]=2`
})

// swap step
steps.push({
  bars: snapshot(bars, { swapping: [0, 1] }),
  highlightLines: [18, 19, 20], // baris: tmp, data[i], data[i+1]
  description: `Tukar [0]↔[1] (7 > 2)`
})
```

---

## Line Mapping per Algoritma

Setiap algoritma punya mapping step-type → line numbers:

### Bubble Sort (C++ 24 baris)
| Aksi | Lines |
|------|-------|
| Outer loop | 14 |
| Inner loop | 15 |
| Compare | 16 |
| Swap tmp | 17 |
| Swap assign | 18, 19 |
| Mark sorted | — (visual only) |

### Insertion Sort
| Aksi | Lines |
|------|-------|
| Outer loop (pick key) | 13, 14 |
| Inner while (shift) | 15, 16 |
| Insert key | 18 |

### Selection Sort
| Aksi | Lines |
|------|-------|
| Outer loop | 13 |
| minIdx init | 14 |
| Inner loop | 15 |
| Update minIdx | 16 |
| Swap | 18, 19, 20 |

### Merge Sort
| Aksi | Lines |
|------|-------|
| mergeSort call | 21 |
| Divide mid | 22 |
| Recursive calls | 23, 24 |
| merge call | 25 |
| Merge compare | 8, 9 |
| Copy L/R | 10, 11 |

### Quick Sort
| Aksi | Lines |
|------|-------|
| partition call | 12 |
| Pivot select | 2 |
| Compare j | 5 |
| Swap i,j | 6, 7, 8 |
| Place pivot | 11, 12 |
| Recursive calls | 17, 18 |

---

## UI Layout

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: Logo + nama app                                  │
├─────────────────────────────────────────────────────────┤
│  ALGO TABS: [Bubble] [Insertion] [Selection] [Merge] [Quick] │
├───────────────────────────┬─────────────────────────────┤
│  LEFT PANEL (55%)         │  RIGHT PANEL (45%)          │
│  ┌─────────────────────┐  │  ┌───────────────────────┐  │
│  │  ArrayInput         │  │  │  C++ Code Panel       │  │
│  │  [7,2,5,3] [reset]  │  │  │  dengan line highlight│  │
│  └─────────────────────┘  │  │  (scroll ke baris aktif│  │
│  ┌─────────────────────┐  │  │   otomatis)           │  │
│  │  Array Visualizer   │  │  └───────────────────────┘  │
│  │  ████ ██ ███ ██     │  │  ┌───────────────────────┐  │
│  │  (bar chart, anim)  │  │  │  Complexity Badges    │  │
│  └─────────────────────┘  │  │  O(n²) O(1)          │  │
│  ┌─────────────────────┐  │  └───────────────────────┘  │
│  │  StepInfo           │  │                             │
│  │  "Tukar [0]↔[1]"   │  │                             │
│  └─────────────────────┘  │                             │
│  ┌─────────────────────┐  │                             │
│  │  Controls           │  │                             │
│  │  |< ⏮ ▶ ⏭ >|  🐢🐇│  │                             │
│  └─────────────────────┘  │                             │
└───────────────────────────┴─────────────────────────────┘
```

---

## Color Palette (Tailwind classes)

| State | Color | Tailwind |
|-------|-------|----------|
| default | slate-500 | `bg-slate-500` |
| comparing | amber-400 | `bg-amber-400` |
| swapping | red-500 | `bg-red-500` |
| sorted | emerald-500 | `bg-emerald-500` |
| pivot | violet-500 | `bg-violet-500` |
| subarray | sky-400 | `bg-sky-400` |
| merged | cyan-400 | `bg-cyan-400` |
| key | yellow-300 | `bg-yellow-300` |

Background: `bg-gray-950` (very dark)
Panels: `bg-gray-900`
Border: `border-gray-700`

---

## Framer Motion Swap Animation

Gunakan `layout` prop + `layoutId` untuk smooth swap:

```tsx
// ArrayVisualizer.tsx
<div className="flex items-end gap-2 h-64">
  <AnimatePresence>
    {bars.map((bar) => (
      <motion.div
        key={bar.id}           // ID tetap, posisi berubah → Framer animasi swap
        layoutId={bar.id}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ height: `${(bar.value / maxValue) * 100}%` }}
        className={`w-16 rounded-t-md ${colorMap[bar.state]}`}
      >
        <span>{bar.value}</span>
      </motion.div>
    ))}
  </AnimatePresence>
</div>
```

**Key insight**: Karena `key` = `bar.id` (bukan index), Framer Motion tahu elemen mana yang bergerak ke mana, menghasilkan animasi "terbang".

---

## Auto-play Logic

```typescript
useEffect(() => {
  if (!isPlaying) return;
  if (currentStepIndex >= steps.length - 1) {
    pause();
    return;
  }
  const timer = setTimeout(nextStep, speed);
  return () => clearTimeout(timer);
}, [isPlaying, currentStepIndex, speed]);
```

---

## Code Panel — Auto-scroll ke Baris Aktif

```typescript
useEffect(() => {
  if (highlightLines.length === 0) return;
  const lineEl = document.querySelector(`[data-line="${highlightLines[0]}"]`);
  lineEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, [highlightLines]);
```

---

## Preset Arrays

```typescript
export const PRESETS = {
  bubble: { soal1: [7, 2, 5, 3], soal2: [4, 3, 2, 1] },
  insertion: { soal1: [7, 2, 5, 3], soal2: [4, 3, 2, 1] },
  selection: { soal1: [7, 2, 5, 3], soal2: [4, 3, 2, 1] },
  merge: { soal1: [7, 2, 5, 3], soal2: [4, 3, 2, 1] },
  quick: { soal1: [7, 2, 5, 3], soal2: [4, 3, 2, 1] },
}
```

User juga bisa input manual: `"8, 3, 1, 7, 2"` → parse → validate → generate steps.

---

## Installation Commands

```bash
npx create-next-app@latest sorting-visualizer \
  --typescript --tailwind --eslint --app --src-dir

cd sorting-visualizer

npm install framer-motion zustand react-syntax-highlighter
npm install -D @types/react-syntax-highlighter
```

---

## Package.json Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "framer-motion": "^11.x",
    "zustand": "^4.x",
    "react-syntax-highlighter": "^15.x"
  },
  "devDependencies": {
    "@types/react-syntax-highlighter": "^15.x",
    "typescript": "^5.x",
    "tailwindcss": "^3.x"
  }
}
```
