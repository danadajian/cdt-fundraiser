import { sum } from "./utils";

export function Payment({ selectedBoxes }: { selectedBoxes: number[] }) {
  return <p>Total amount: ${sum(selectedBoxes)}</p>;
}
