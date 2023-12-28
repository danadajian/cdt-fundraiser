import { type PropsWithChildren } from "react";

import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "./constants";

export function getBoxes() {
  return {};
}

function range(length: number) {
  return Array.from({ length }, (_, i) => i + 1).reverse();
}

export function Boxes() {
  return (
    <>
      <table className="table-auto">
        <tbody>
          {range(NUMBER_OF_ROWS).map((rowNumber) => (
            <tr key={rowNumber}>
              {range(NUMBER_OF_COLUMNS).map((columnNumber) => (
                <Cell key={columnNumber}>
                  {(rowNumber - 1) * NUMBER_OF_COLUMNS + columnNumber}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Cell({ children }: PropsWithChildren) {
  return <td className="border-2 border-black">{children}</td>;
}
