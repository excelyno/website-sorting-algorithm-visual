import { ArrayBar, Step } from './types';

function snapshot(bars: ArrayBar[]): ArrayBar[] {
  return bars.map(b => ({ ...b }));
}

export function generateMergeSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const bars: ArrayBar[] = input.map((v, i) => ({
    value: v,
    state: 'default' as const,
    id: `bar-${i}-${v}`,
  }));

  steps.push({
    bars: snapshot(bars),
    highlightLines: [24],
    description: 'Array awal sebelum sorting',
    phase: 'START',
  });

  function mergeSortHelper(l: number, r: number) {
    if (l >= r) return;

    const m = Math.floor((l + r) / 2);

    // Show divide
    for (let k = l; k <= r; k++) bars[k].state = 'subarray';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [20, 21],
      description: `Bagi [${l}..${r}] → [${l}..${m}] dan [${m+1}..${r}]`,
      phase: 'DIVIDE',
    });
    for (let k = l; k <= r; k++) bars[k].state = 'default';

    mergeSortHelper(l, m);
    mergeSortHelper(m + 1, r);

    // Merge phase
    const left = bars.slice(l, m + 1).map(b => ({ ...b }));
    const right = bars.slice(m + 1, r + 1).map(b => ({ ...b }));

    for (let k = l; k <= r; k++) bars[k].state = 'subarray';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [4, 5, 6],
      description: `Gabungkan sub-array [${l}..${m}] dan [${m+1}..${r}]`,
      phase: 'MERGE',
    });

    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      bars[l + i].state = 'comparing';
      bars[m + 1 + j].state = 'comparing';
      steps.push({
        bars: snapshot(bars),
        highlightLines: [8],
        description: `Bandingkan L[${i}]=${left[i].value} dan R[${j}]=${right[j].value}`,
        phase: 'MERGE',
      });

      if (left[i].value <= right[j].value) {
        bars[k].value = left[i].value;
        bars[k].id = left[i].id;
        bars[k].state = 'merged';
        i++;
      } else {
        bars[k].value = right[j].value;
        bars[k].id = right[j].id;
        bars[k].state = 'merged';
        j++;
      }
      // Reset comparing colors
      for (let x = l; x <= r; x++) {
        if (bars[x].state !== 'merged') bars[x].state = 'subarray';
      }
      steps.push({
        bars: snapshot(bars),
        highlightLines: [9],
        description: `Tempatkan ${bars[k].value} di index ${k}`,
        phase: 'MERGE',
      });
      k++;
    }

    while (i < left.length) {
      bars[k].value = left[i].value;
      bars[k].id = left[i].id;
      bars[k].state = 'merged';
      i++; k++;
    }
    while (j < right.length) {
      bars[k].value = right[j].value;
      bars[k].id = right[j].id;
      bars[k].state = 'merged';
      j++; k++;
    }

    // Show merged result
    for (let x = l; x <= r; x++) bars[x].state = 'merged';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [10, 11],
      description: `Hasil merge [${l}..${r}]: [${bars.slice(l, r+1).map(b=>b.value).join(', ')}]`,
      phase: 'MERGE',
    });

    // If full array merged, mark all sorted
    if (l === 0 && r === bars.length - 1) {
      for (let x = 0; x < bars.length; x++) bars[x].state = 'sorted';
    }
  }

  mergeSortHelper(0, bars.length - 1);

  steps.push({
    bars: snapshot(bars),
    highlightLines: [25, 26],
    description: 'Array sudah terurut sepenuhnya ✓',
    phase: 'DONE',
  });

  return steps;
}
