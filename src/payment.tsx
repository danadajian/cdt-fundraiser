import { useContext } from "react";

import { BoxesContext } from "./providers/boxes-provider";
import { sum } from "./utils";

export function Payment() {
  const { selectedBoxes } = useContext(BoxesContext);

  return <p>Total amount: ${sum(selectedBoxes)}</p>;
}
