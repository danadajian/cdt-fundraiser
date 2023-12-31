import { useContext } from "react";

import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "./constants";
import { SquaresContext } from "./providers/squares-provider";
import { trpc } from "./trpc";
import { reversedRange } from "./utils";

export function Squares() {
  const { selectedSquares, setSelectedSquares } = useContext(SquaresContext);
  function onClick(squareAmount: number) {
    const newSquares = selectedSquares.includes(squareAmount)
      ? selectedSquares.filter((amount) => amount !== squareAmount)
      : selectedSquares.concat(squareAmount);
    setSelectedSquares(newSquares);
  }

  const [squaresTaken] = trpc.getSquares.useSuspenseQuery();

  return (
    <>
      <table className="table-auto">
        <tbody>
          {reversedRange(NUMBER_OF_ROWS).map((rowNumber) => (
            <tr key={rowNumber}>
              {reversedRange(NUMBER_OF_COLUMNS).map((columnNumber) => {
                const squareAmount =
                  (rowNumber - 1) * NUMBER_OF_COLUMNS + columnNumber;
                const squareColor = selectedSquares.includes(squareAmount)
                  ? "bg-red-800"
                  : "bg-red-500";
                const squareDisabled = Boolean(
                  squaresTaken.find(({ amount }) => amount === squareAmount),
                );
                const squareHover = squareDisabled
                  ? "bg-slate-400"
                  : "hover:bg-red-300";
                return (
                  <td
                    key={columnNumber}
                    className={`border-2 border-black p-1 ${squareColor} ${squareHover}`}
                  >
                    <button
                      disabled={squareDisabled}
                      onClick={() => onClick(squareAmount)}
                      className="w-full"
                    >
                      ${squareAmount}
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
