import { ArrayBar, Step } from './types';

function snapshot(bars: ArrayBar[]): ArrayBar[] {
  return bars.map(b => ({ ...b }));
}

export function generateQuickSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const bars: ArrayBar[] = input.map((v, i) => ({
    value: v,
    state: 'default' as const,
    id: `bar-${i}-${v}`,
  }));

  steps.push({
    bars: snapshot(bars),
    highlightLines: [22],
    description: 'Array awal sebelum sorting',
  });

  function partitionHelper(low: number, high: number): number {
    const pivotValue = bars[high].value;
    bars[high].state = 'pivot';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [2, 3],
      description: `Pilih pivot = ${pivotValue} (index ${high})`,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      bars[j].state = 'comparing';
      steps.push({
        bars: snapshot(bars),
        highlightLines: [5],
        description: `j=${j}: bandingkan a[${j}]=${bars[j].value} dengan pivot=${pivotValue}`,
      });

      if (bars[j].value < pivotValue) {
        i++;
        bars[j].state = 'swapping';
        if (i !== j) bars[i].state = 'swapping';
        steps.push({
          bars: snapshot(bars),
          highlightLines: [6, 7, 8],
          description: `a[${j}]=${bars[j].value} < pivot, tukar a[${i}] ↔ a[${j}]`,
        });

        const tmpVal = bars[i].value;
        const tmpId = bars[i].id;
        bars[i].value = bars[j].value;
        bars[i].id = bars[j].id;
        bars[j].value = tmpVal;
        bars[j].id = tmpId;

        bars[i].state = 'default';
        bars[j].state = 'default';
        bars[high].state = 'pivot';
      } else {
        bars[j].state = 'default';
        steps.push({
          bars: snapshot(bars),
          highlightLines: [5],
          description: `a[${j}]=${bars[j].value} ≥ pivot=${pivotValue}, skip`,
        });
      }
    }

    // Place pivot
    const pivotIdx = i + 1;
    bars[pivotIdx].state = 'swapping';
    bars[high].state = 'swapping';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [11, 12],
      description: `Tempatkan pivot=${pivotValue} di index ${pivotIdx}`,
    });

    const tmpVal = bars[pivotIdx].value;
    const tmpId = bars[pivotIdx].id;
    bars[pivotIdx].value = bars[high].value;
    bars[pivotIdx].id = bars[high].id;
    bars[high].value = tmpVal;
    bars[high].id = tmpId;

    bars[pivotIdx].state = 'sorted';
    bars[high].state = 'default';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [13],
      description: `Pivot ${pivotValue} di posisi final (index ${pivotIdx}) ✓`,
    });

    return pivotIdx;
  }

  function quickSortHelper(low: number, high: number) {
    if (low >= high) {
      if (low === high) bars[low].state = 'sorted';
      return;
    }

    const pi = partitionHelper(low, high);
    quickSortHelper(low, pi - 1);
    quickSortHelper(pi + 1, high);
  }

  quickSortHelper(0, bars.length - 1);

  for (let i = 0; i < bars.length; i++) bars[i].state = 'sorted';
  steps.push({
    bars: snapshot(bars),
    highlightLines: [22, 23],
    description: 'Array sudah terurut sepenuhnya ✓',
  });

  return steps;
}
