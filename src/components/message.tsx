import { useContext } from "react";

import { RAFFLE_TICKET_COST } from "../constants";
import { SquaresContext } from "../providers/squares-provider";

export function Message() {
  const { selectedSquares, donationAmount, raffleTicketsEarned } =
    useContext(SquaresContext);
  const amountToEarnAnotherRaffleTicket =
    RAFFLE_TICKET_COST - (donationAmount % RAFFLE_TICKET_COST);
  if (!selectedSquares.length) {
    return null;
  }

  return (
    <p className="absolute font-bold">
      You are ${amountToEarnAnotherRaffleTicket} away from earning{" "}
      {raffleTicketsEarned > 0 ? "another" : "a"} raffle ticket!
    </p>
  );
}
