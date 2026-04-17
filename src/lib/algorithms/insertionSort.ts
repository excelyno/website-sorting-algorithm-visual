import { ArrayBar, Step } from './types';

function snapshot(bars: ArrayBar[]): ArrayBar[] {
  return bars.map(b => ({ ...b }));
}

export function generateInsertionSortSteps(input: number[]): Step[] {
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
  bars[0].state = 'sorted';

  for (let r = 1; r < n; r++) {
    const keyValue = bars[r].value;
    const keyId = bars[r].id;

    // Pick key
    bars[r].state = 'key';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [13, 14],
      description: `Ambil key=${keyValue} dari index ${r}`,
    });

    let i = r - 1;

    while (i >= 0 && bars[i].value > keyValue) {
      // Show comparison
      bars[i].state = 'comparing';
      steps.push({
        bars: snapshot(bars),
        highlightLines: [15],
        description: `a[${i}]=${bars[i].value} > key=${keyValue}, geser ke kanan`,
      });

      // Shift right
      bars[i + 1].value = bars[i].value;
      bars[i + 1].id = bars[i].id;
      bars[i + 1].state = 'swapping';
      bars[i].state = 'sorted';
      steps.push({
        bars: snapshot(bars),
        highlightLines: [16],
        description: `Geser a[${i}]=${bars[i + 1].value} → index ${i + 1}`,
      });

      bars[i].state = 'sorted';
      bars[i + 1].state = 'sorted';
      i--;
    }

    // Insert key
    bars[i + 1].value = keyValue;
    bars[i + 1].id = keyId;
    bars[i + 1].state = 'swapping';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [18],
      description: `Sisipkan key=${keyValue} di index ${i + 1}`,
    });

    // Mark sorted portion
    for (let k = 0; k <= r; k++) bars[k].state = 'sorted';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [12],
      description: `Bagian terurut sekarang: [${bars.slice(0, r + 1).map(b => b.value).join(', ')}]`,
    });
  }

  steps.push({
    bars: snapshot(bars),
    highlightLines: [22, 23],
    description: 'Array sudah terurut sepenuhnya ✓',
  });

  return steps;
}
