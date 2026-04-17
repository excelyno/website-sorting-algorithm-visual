export type AlgoName = 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';

export type BarState =
  | 'default'    // abu-abu — idle
  | 'comparing'  // kuning — sedang dibandingkan
  | 'swapping'   // merah — sedang ditukar
  | 'sorted'     // hijau — posisi final
  | 'pivot'      // ungu — pivot (Quick Sort)
  | 'subarray'   // biru — sub-array aktif (Merge Sort)
  | 'merged'     // cyan — sudah digabung (Merge Sort)
  | 'key';       // kuning terang — key dipegang (Insertion Sort)

export interface ArrayBar {
  value: number;
  state: BarState;
  id: string; // unique ID untuk Framer Motion layoutId
}

export interface Step {
  bars: ArrayBar[];
  highlightLines: number[];
  description: string;
  phase?: string; // 'DIVIDE' | 'MERGE' untuk Merge Sort
}
