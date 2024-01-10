import { Dialog as HeadlessUiDialog } from "@headlessui/react";
import { useContext, useState } from "react";

import { RAFFLE_TICKET_COST } from "../constants";
import { SquaresContext } from "../providers/squares-provider";
import { trpc } from "../trpc";
import { Dialog } from "./dialog";

export function Payment() {
  const { selectedSquares, donationAmount, raffleTicketsEarned } =
    useContext(SquaresContext);
  const [name, setName] = useState("");
  const [isFinishedPicking, setIsFinishedPicking] = useState(false);
  const amountToEarnAnotherRaffleTicket =
    RAFFLE_TICKET_COST - (donationAmount % RAFFLE_TICKET_COST);

  const { mutate: purchaseSquares } = trpc.purchaseSquares.useMutation({
    throwOnError: true,
    onSuccess: () => setIsFinishedPicking(true),
  });
  const payNowDisabled = !selectedSquares.length || !name;
  const buttonClasses =
    "rounded-lg border-0 mt-2 px-8 py-2 bg-brown text-stone-100";

  return (
    <div className="mt-4 flex max-w-52 flex-col items-center">
      <Results />
      <input
        className="mt-2 h-10 rounded-md border text-center"
        type="text"
        placeholder="Type your name here"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        className={`ml-2 ${buttonClasses} ${
          payNowDisabled ? "opacity-30" : ""
        }`}
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
      {Boolean(selectedSquares.length) && (
        <p className="mt-4 font-bold">
          You are ${amountToEarnAnotherRaffleTicket} away from earning{" "}
          {raffleTicketsEarned > 0 ? "another" : "a"} raffle ticket!
        </p>
      )}
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
    <div className="font-semibold">
      <p>Total amount: ${donationAmount}</p>
      <p>Raffle tickets earned: {raffleTicketsEarned}</p>
    </div>
  );
}
