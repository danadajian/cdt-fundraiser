import { Dialog as HeadlessUiDialog } from "@headlessui/react";
import { useContext, useState } from "react";

import { RAFFLE_TICKET_ALERT_THRESHOLD, RAFFLE_TICKET_COST } from "./constants";
import { Dialog } from "./dialog";
import { BoxesContext } from "./providers/boxes-provider";

export function Payment() {
  const { selectedBoxes, donationAmount } = useContext(BoxesContext);
  const [name, setName] = useState("");
  const [isFinishedPicking, setIsFinishedPicking] = useState(false);
  const amountToEarnAnotherRaffleTicket =
    RAFFLE_TICKET_COST - (donationAmount % RAFFLE_TICKET_COST);
  const isCloseToEarningARaffleTicket =
    amountToEarnAnotherRaffleTicket <= RAFFLE_TICKET_ALERT_THRESHOLD;

  return (
    <>
      {isCloseToEarningARaffleTicket && (
        <p>
          You are ${amountToEarnAnotherRaffleTicket} away from earning a raffle
          ticket!
        </p>
      )}
      <Results />
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
          <Results />
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

function Results() {
  const { donationAmount, raffleTicketCount } = useContext(BoxesContext);
  return (
    <>
      <p>Total amount: ${donationAmount}</p>
      <p>Raffle tickets earned: {raffleTicketCount}</p>
    </>
  );
}
