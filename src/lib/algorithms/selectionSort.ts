import { ArrayBar, Step } from './types';

function snapshot(bars: ArrayBar[]): ArrayBar[] {
  return bars.map(b => ({ ...b }));
}

export function generateSelectionSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const bars: ArrayBar[] = input.map((v, i) => ({
    value: v,
    state: 'default' as const,
    id: `bar-${i}-${v}`,
  }));

  steps.push({
    bars: snapshot(bars),
    highlightLines: [6],
    description: 'Array awal sebelum sorting',
  });

  const n = bars.length;

  for (let r = 0; r < n - 1; r++) {
    let minIdx = r;
    bars[r].state = 'pivot'; // gunakan pivot color untuk "current min candidate"

    steps.push({
      bars: snapshot(bars),
      highlightLines: [13, 14],
      description: `r=${r}: asumsikan minIdx=${r} (a[${r}]=${bars[r].value})`,
    });

    for (let i = r + 1; i < n; i++) {
      bars[i].state = 'comparing';
      steps.push({
        bars: snapshot(bars),
        highlightLines: [15, 16],
        description: `Bandingkan a[${i}]=${bars[i].value} dengan min=${bars[minIdx].value}`,
      });

      if (bars[i].value < bars[minIdx].value) {
        bars[minIdx].state = minIdx === r ? 'default' : 'default';
        minIdx = i;
        bars[minIdx].state = 'pivot';
        steps.push({
          bars: snapshot(bars),
          highlightLines: [17],
          description: `a[${i}]=${bars[i].value} lebih kecil, update minIdx=${i}`,
        });
      } else {
        bars[i].state = 'default';
        if (bars[minIdx] && minIdx !== r) bars[minIdx].state = 'pivot';
      }
    }

    // Reset non-min, non-sorted bars
    for (let k = r + 1; k < n; k++) {
      if (bars[k].state !== 'sorted') bars[k].state = 'default';
    }

    if (minIdx !== r) {
      bars[r].state = 'swapping';
      bars[minIdx].state = 'swapping';
      steps.push({
        bars: snapshot(bars),
        highlightLines: [20, 21, 22],
        description: `Tukar a[${r}]=${bars[r].value} ↔ a[${minIdx}]=${bars[minIdx].value}`,
      });

      const tmpVal = bars[r].value;
      const tmpId = bars[r].id;
      bars[r].value = bars[minIdx].value;
      bars[r].id = bars[minIdx].id;
      bars[minIdx].value = tmpVal;
      bars[minIdx].id = tmpId;
    } else {
      steps.push({
        bars: snapshot(bars),
        highlightLines: [19],
        description: `a[${r}] sudah di posisi minimum, tidak perlu tukar`,
      });
    }

    bars[r].state = 'sorted';
    if (bars[minIdx]) bars[minIdx].state = 'default';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [13],
      description: `a[${r}]=${bars[r].value} sudah di posisi final`,
    });
  }

  bars[n - 1].state = 'sorted';
  steps.push({
    bars: snapshot(bars),
    highlightLines: [26, 27],
    description: 'Array sudah terurut sepenuhnya ✓',
  });

  return steps;
}
