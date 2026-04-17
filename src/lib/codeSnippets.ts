import { AlgoName } from './algorithms/types';

export const CODE_SNIPPETS: Record<AlgoName, string> = {
  bubble: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> data = {7, 2, 5, 3};
    int n = data.size();

    cout << "Data awal: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    // Bubble Sort
    for (int r = 0; r < n - 1; r++) {
        for (int i = 0; i < n - r - 1; i++) {
            if (data[i] > data[i + 1]) {
                int tmp = data[i];
                data[i] = data[i + 1];
                data[i + 1] = tmp;
            }
        }
    }

    cout << "Data terurut: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    return 0;
}`,

  insertion: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> data = {7, 2, 5, 3};
    int n = data.size();

    cout << "Data awal: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    // Insertion Sort
    for (int r = 1; r < n; r++) {
        int key = data[r];
        int i = r - 1;
        while (i >= 0 && data[i] > key) {
            data[i + 1] = data[i];
            i--;
        }
        data[i + 1] = key;
    }

    cout << "Data terurut: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    return 0;
}`,

  selection: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> data = {7, 2, 5, 3};
    int n = data.size();

    cout << "Data awal: ";
    for (int x : data) cout << x << " ";
    cout << endl;

    // Selection Sort
    for (int r = 0; r < n - 1; r++) {
        int minIdx = r;
        for (int i = r + 1; i < n; i++) {
            if (data[i] < data[minIdx])
                minIdx = i;
        }
        if (minIdx != r) {
            int tmp = data[r];
            data[r] = data[minIdx];
            data[minIdx] = tmp;
        }
    }

    cout << "Data terurut: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    return 0;
}`,

  merge: `void merge(vector<int>& data, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = data[l + i];
    for (int j = 0; j < n2; j++) R[j] = data[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        data[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) data[k++] = L[i++];
    while (j < n2) data[k++] = R[j++];
}

void mergeSort(vector<int>& data, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(data, l, m);
        mergeSort(data, m + 1, r);
        merge(data, l, m, r);
    }
}

int main() {
    vector<int> data = {7, 2, 5, 3};
    cout << "Data awal: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    mergeSort(data, 0, data.size() - 1);
    cout << "Data terurut: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    return 0;
}`,

  quick: `int partition(vector<int>& data, int low, int high) {
    int pivot = data[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (data[j] < pivot) {
            i++;
            int tmp = data[i];
            data[i] = data[j];
            data[j] = tmp;
        }
    }
    int tmp = data[i + 1];
    data[i + 1] = data[high];
    data[high] = tmp;
    return i + 1;
}

void quickSort(vector<int>& data, int low, int high) {
    if (low < high) {
        int pi = partition(data, low, high);
        quickSort(data, low, pi - 1);
        quickSort(data, pi + 1, high);
    }
}

int main() {
    vector<int> data = {7, 2, 5, 3};
    cout << "Data awal: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    quickSort(data, 0, data.size() - 1);
    cout << "Data terurut: ";
    for (int x : data) cout << x << " ";
    cout << endl;
    return 0;
}`,
};

export const ALGO_LABELS: Record<AlgoName, string> = {
  bubble: 'Bubble Sort',
  insertion: 'Insertion Sort',
  selection: 'Selection Sort',
  merge: 'Merge Sort',
  quick: 'Quick Sort',
};

export const COMPLEXITY: Record<AlgoName, { best: string; avg: string; worst: string; space: string }> = {
  bubble:    { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  insertion: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  selection: { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  merge:     { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  quick:     { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
};

export const PRESETS = {
  soal1: [7, 2, 5, 3],
  soal2: [4, 3, 2, 1],
};
