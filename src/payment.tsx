export function Payment({ selectedBoxes }: { selectedBoxes: number[] }) {
  return <p>Total amount: ${selectedBoxes.reduce((a, b) => a + b, 0)}</p>;
}
