import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "./constants";

export function getBoxes() {
  return {};
}

function range(length: number) {
  return Array.from({ length }, (_, i) => i + 1).reverse();
}

export function Boxes({
  selectedBoxes,
  setSelectedBoxes,
}: {
  selectedBoxes: number[];
  setSelectedBoxes: (selectedBoxes: number[]) => void;
}) {
  function onClick(boxAmount: number) {
    if (selectedBoxes.includes(boxAmount)) {
      setSelectedBoxes(selectedBoxes.filter((amount) => amount !== boxAmount));
    } else {
      setSelectedBoxes(selectedBoxes.concat(boxAmount));
    }
  }

  return (
    <>
      <table className="table-auto">
        <tbody>
          {range(NUMBER_OF_ROWS).map((rowNumber) => (
            <tr key={rowNumber}>
              {range(NUMBER_OF_COLUMNS).map((columnNumber) => {
                const boxAmount =
                  (rowNumber - 1) * NUMBER_OF_COLUMNS + columnNumber;
                const boxColor = selectedBoxes.includes(boxAmount)
                  ? "bg-red-800"
                  : "bg-red-400";
                return (
                  <td
                    key={columnNumber}
                    className={`border-2 border-black p-1 ${boxColor} hover:bg-red-900`}
                  >
                    <button
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
