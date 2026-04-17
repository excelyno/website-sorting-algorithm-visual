# SortViz — Sorting Algorithm Visualizer

Visualisasi interaktif 5 algoritma sorting dengan animasi blok yang sinkron dengan highlight kode C++.

**Algoritma:** Bubble Sort · Insertion Sort · Selection Sort · Merge Sort · Quick Sort

---

## Cara Setup

### 1. Buat project Next.js baru

```bash
npx create-next-app@latest sorting-visualizer \
  --typescript --tailwind --eslint --app --src-dir --no-import-alias

cd sorting-visualizer
```

### 2. Install dependencies tambahan

```bash
npm install framer-motion zustand
```

### 3. Copy semua file dari scaffold ini

Salin semua file berikut ke project kamu (sesuaikan path):

```
src/
├── app/
│   ├── layout.tsx          ← ganti yang ada
│   ├── page.tsx            ← ganti yang ada
│   └── globals.css         ← ganti yang ada
├── components/
│   ├── VisualizerApp.tsx
│   ├── AlgoSelector.tsx
│   ├── ArrayInput.tsx
│   ├── ArrayVisualizer.tsx
│   ├── ArrayBar.tsx
│   ├── CodePanel.tsx
│   ├── StepInfo.tsx
│   ├── Controls.tsx
│   └── ComplexityBadge.tsx
├── lib/
│   ├── algorithms/
│   │   ├── types.ts
│   │   ├── bubbleSort.ts
│   │   ├── insertionSort.ts
│   │   ├── selectionSort.ts
│   │   ├── mergeSort.ts
│   │   └── quickSort.ts
│   └── codeSnippets.ts
└── store/
    └── visualizerStore.ts

tailwind.config.ts   ← ganti yang ada
```

### 4. Jalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Fitur

| Fitur | Detail |
|-------|--------|
| 5 algoritma | Bubble, Insertion, Selection, Merge, Quick Sort |
| Animasi swap | Framer Motion spring layout — blok "terbang" |
| Kode C++ sinkron | Baris yang aktif di-highlight otomatis saat langkah |
| Auto-scroll kode | Panel kode scroll ke baris aktif otomatis |
| Play/Pause/Step | Kontrol penuh atas playback |
| Speed control | 0.5× 1× 2× 4× |
| Custom input | Input array sendiri, atau pakai preset/random |
| Warna state | comparing (kuning), swapping (merah), sorted (hijau), pivot (ungu), dll |
| Responsive | Desktop split-view, mobile collapsible code panel |

---

## Struktur State (Zustand)

```
algo          → algoritma aktif
inputArray    → array yang diinput user
steps[]       → semua langkah yang di-generate
currentStepIndex → langkah saat ini
isPlaying     → sedang auto-play atau tidak
speed         → ms per langkah (200/400/800/1600)
```

---

## Menambah Algoritma Baru

1. Buat file `src/lib/algorithms/namaAlgo.ts`
2. Export fungsi `generateNameAlgoSteps(input: number[]): Step[]`
3. Tambahkan ke `GENERATORS` di `store/visualizerStore.ts`
4. Tambahkan code snippet ke `src/lib/codeSnippets.ts`
5. Tambahkan ke `ALGOS` array di `AlgoSelector.tsx`

---

## Kustomisasi Warna

Edit `COLOR_MAP` di `src/components/ArrayBar.tsx` untuk mengubah warna tiap state bar.

---

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Zustand (state management)
- Framer Motion (animasi layout swap)
- Tailwind CSS (styling)
- Google Fonts: Outfit + Geist Mono
