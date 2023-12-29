import { useContext } from "react";

import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "./constants";
import { BoxesContext } from "./providers/boxes-provider";
import { trpc } from "./trpc";
import { reversedRange } from "./utils";

export function Boxes() {
  const { selectedBoxes, setSelectedBoxes } = useContext(BoxesContext);
  function onClick(boxAmount: number) {
    const newBoxes = selectedBoxes.includes(boxAmount)
      ? selectedBoxes.filter((amount) => amount !== boxAmount)
      : selectedBoxes.concat(boxAmount);
    setSelectedBoxes(newBoxes);
  }

  const [boxesTaken] = trpc.getBoxes.useSuspenseQuery();

  return (
    <>
      <table className="table-auto">
        <tbody>
          {reversedRange(NUMBER_OF_ROWS).map((rowNumber) => (
            <tr key={rowNumber}>
              {reversedRange(NUMBER_OF_COLUMNS).map((columnNumber) => {
                const boxAmount =
                  (rowNumber - 1) * NUMBER_OF_COLUMNS + columnNumber;
                const boxColor = selectedBoxes.includes(boxAmount)
                  ? "bg-red-800"
                  : "bg-red-500";
                const boxDisabled = Boolean(
                  boxesTaken.find(({ amount }) => amount === boxAmount),
                );
                const boxHover = boxDisabled
                  ? "bg-slate-400"
                  : "hover:bg-red-300";
                return (
                  <td
                    key={columnNumber}
                    className={`border-2 border-black p-1 ${boxColor} ${boxHover}`}
                  >
                    <button
                      disabled={boxDisabled}
                      onClick={() => onClick(boxAmount)}
                      className="w-full"
                    >
                      ${boxAmount}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
