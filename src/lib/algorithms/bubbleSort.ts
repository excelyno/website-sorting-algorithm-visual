import { ArrayBar, Step } from './types';

function snapshot(bars: ArrayBar[]): ArrayBar[] {
  return bars.map(b => ({ ...b }));
}

function makeStep(
  bars: ArrayBar[],
  highlightLines: number[],
  description: string,
  overrides?: Partial<Record<number, ArrayBar['state']>>
): Step {
  const copy = snapshot(bars);
  if (overrides) {
    for (const [idx, state] of Object.entries(overrides)) {
      copy[Number(idx)].state = state;
    }
  }
  return { bars: copy, highlightLines, description };
}

export function generateBubbleSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const bars: ArrayBar[] = input.map((v, i) => ({
    value: v,
    state: 'default',
    id: `bar-${i}-${v}`,
  }));

  // Initial state
  steps.push({
    bars: snapshot(bars),
    highlightLines: [6],
    description: 'Array awal sebelum sorting',
  });

  const n = bars.length;

  for (let r = 0; r < n - 1; r++) {
    for (let i = 0; i < n - r - 1; i++) {
      // Compare step
      const compareStep = makeStep(bars, [15, 16], `Bandingkan a[${i}]=${bars[i].value} dan a[${i+1}]=${bars[i+1].value}`, {
        [i]: 'comparing',
        [i+1]: 'comparing',
      });
      steps.push(compareStep);

      if (bars[i].value > bars[i + 1].value) {
        // Swap step
        const swapStep = makeStep(bars, [17, 18, 19], `Tukar [${i}]↔[${i+1}] (${bars[i].value} > ${bars[i+1].value})`, {
          [i]: 'swapping',
          [i+1]: 'swapping',
        });
        steps.push(swapStep);

        // Perform actual swap
        const tmp = bars[i].value;
        bars[i].value = bars[i + 1].value;
        bars[i + 1].value = tmp;
        const tmpId = bars[i].id;
        bars[i].id = bars[i + 1].id;
        bars[i + 1].id = tmpId;
      } else {
        steps.push(makeStep(bars, [16], `a[${i}]=${bars[i].value} ≤ a[${i+1}]=${bars[i+1].value}, tidak ditukar`, {
          [i]: 'default',
          [i+1]: 'default',
        }));
      }

      // Reset colors
      bars[i].state = 'default';
      bars[i + 1].state = 'default';
    }

    // Mark sorted
    bars[n - 1 - r].state = 'sorted';
    steps.push({
      bars: snapshot(bars),
      highlightLines: [14],
      description: `a[${n - 1 - r}]=${bars[n - 1 - r].value} sudah di posisi final`,
    });
  }

  // Mark first element sorted
  bars[0].state = 'sorted';
  steps.push({
    bars: snapshot(bars),
    highlightLines: [22, 23],
    description: 'Array sudah terurut sepenuhnya ✓',
  });

  return steps;
}
