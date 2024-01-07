import { Dialog as HeadlessUiDialog } from "@headlessui/react";
import { useContext, useState } from "react";

import {
  RAFFLE_TICKET_ALERT_THRESHOLD,
  RAFFLE_TICKET_COST,
} from "../constants";
import { SquaresContext } from "../providers/squares-provider";
import { trpc } from "../trpc";
import { Dialog } from "./dialog";

export function Payment() {
  const { selectedSquares, donationAmount } = useContext(SquaresContext);
  const [name, setName] = useState("");
  const [isFinishedPicking, setIsFinishedPicking] = useState(false);
  const amountToEarnAnotherRaffleTicket =
    RAFFLE_TICKET_COST - (donationAmount % RAFFLE_TICKET_COST);
  const isCloseToEarningARaffleTicket =
    amountToEarnAnotherRaffleTicket <= RAFFLE_TICKET_ALERT_THRESHOLD;

  const { mutate: purchaseSquares } = trpc.purchaseSquares.useMutation({
    throwOnError: true,
    onSuccess: () => setIsFinishedPicking(true),
  });
  const payNowDisabled = !selectedSquares.length || !name;
  const buttonClasses =
    "rounded-lg border-2 border-slate-100 mt-2 p-2 bg-blue-800 text-white";

  return (
    <div className="mt-4 flex flex-col">
      {isCloseToEarningARaffleTicket && (
        <p>
          You are ${amountToEarnAnotherRaffleTicket} away from earning a raffle
          ticket!
        </p>
      )}
      <Results />
      <div>
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
      </div>
      <Dialog dialogIsOpen={isFinishedPicking}>
        <>
          <HeadlessUiDialog.Title
            as="h2"
            className="pt-2 text-xl font-semibold leading-6"
          >
            Agent {name}: You've helped us complete the mission!
          </HeadlessUiDialog.Title>
          <Results />
          <HeadlessUiDialog.Description className="pt-5 font-semibold text-slate-500">
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
    <>
      <p>Total amount: ${donationAmount}</p>
      <p>Raffle tickets earned: {raffleTicketsEarned}</p>
    </>
  );
}
