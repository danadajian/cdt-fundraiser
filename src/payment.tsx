import { Dialog as HeadlessUiDialog } from "@headlessui/react";
import { useContext, useState } from "react";

import { Dialog } from "./dialog";
import { BoxesContext } from "./providers/boxes-provider";
import { sum } from "./utils";

export function Payment() {
  const { selectedBoxes } = useContext(BoxesContext);
  const [name, setName] = useState("");
  const [isFinishedPicking, setIsFinishedPicking] = useState(false);
  const totalAmountString = `Total amount: $${sum(selectedBoxes)}`;

  return (
    <>
      <p>{totalAmountString}</p>
      <input
        className="text-center"
        type="text"
        placeholder="Type your name here"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        disabled={!selectedBoxes.length || !name}
        onClick={() => setIsFinishedPicking(true)}
      >
        Pay Now
      </button>
      <Dialog dialogIsOpen={isFinishedPicking}>
        <>
          <HeadlessUiDialog.Title
            as="h2"
            className="pt-2 text-xl font-semibold leading-6"
          >
            Agent {name}: You've helped us complete the mission!
          </HeadlessUiDialog.Title>
          <h3>{totalAmountString}</h3>
          <HeadlessUiDialog.Description className="pt-5 font-semibold text-slate-500">
            Your squares have been reserved. Remember your total amount and
            enter it on the next page.
          </HeadlessUiDialog.Description>
          <button>
            <a href="https://www.dortamid.org/missionpossible2" target="_blank">
              Click here to continue
            </a>
          </button>
        </>
      </Dialog>
    </>
  );
}
