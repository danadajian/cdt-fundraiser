export function reversedRange(length: number) {
  return Array.from({ length }, (_, i) => i + 1).reverse();
}

export function sum(array: number[]) {
  return array.reduce((a, b) => a + b, 0);
}
