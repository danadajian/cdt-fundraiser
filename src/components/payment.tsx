import { Dialog as HeadlessUiDialog } from "@headlessui/react";
import { useContext, useState } from "react";

import { SquaresContext } from "../providers/squares-provider";
import { trpc } from "../trpc";
import { Dialog } from "./dialog";

export function Payment() {
  const { selectedSquares } = useContext(SquaresContext);
  const [name, setName] = useState("");
  const [isFinishedPicking, setIsFinishedPicking] = useState(false);

  const { mutate: purchaseSquares } = trpc.purchaseSquares.useMutation({
    throwOnError: true,
    onSuccess: () => setIsFinishedPicking(true),
  });
  const payNowDisabled = !selectedSquares.length || !name;
  const buttonClasses = "rounded-lg border-0 px-8 py-2 bg-brown text-stone-100";

  return (
    <div className="flex w-6/12 max-w-screen-sm items-center justify-around pb-6 pt-12">
      <Results />
      <input
        className="h-10 rounded-md border text-center"
        type="text"
        placeholder="Type your name here"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        className={`${buttonClasses} ${payNowDisabled ? "opacity-30" : ""}`}
        disabled={payNowDisabled}
        onClick={() =>
          purchaseSquares({
            name,
            selectedSquares,
          })
        }
      >
        Pay Now
      </button>
      <Dialog dialogIsOpen={isFinishedPicking}>
        <>
          <HeadlessUiDialog.Title
            as="h2"
            className="pt-2 text-xl font-semibold leading-6"
          >
            Thanks, {name}!
          </HeadlessUiDialog.Title>
          <Results />
          <HeadlessUiDialog.Description className="pt-5 font-semibold">
            Your squares have been reserved. Remember your total amount and
            enter it on the next page.
          </HeadlessUiDialog.Description>
          <button className={buttonClasses}>
            <a href="https://www.dortamid.org/missionpossible2" target="_blank">
              Click here to continue
            </a>
          </button>
        </>
      </Dialog>
    </div>
  );
}

function Results() {
  const { donationAmount, raffleTicketsEarned } = useContext(SquaresContext);
  return (
    <div className="font-medium">
      <p>Total amount: ${donationAmount}</p>
      <p>Raffle tickets earned: {raffleTicketsEarned}</p>
    </div>
  );
}
