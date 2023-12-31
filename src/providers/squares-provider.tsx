import { createContext, type PropsWithChildren, useState } from "react";

import { countRaffleTickets, sum } from "../utils";

export type SquaresProviderInfo = {
  selectedSquares: number[];
  setSelectedSquares: (selectedSquares: number[]) => void;
  donationAmount: number;
  raffleTicketsEarned: number;
};

export const SquaresContext = createContext<SquaresProviderInfo>({
  selectedSquares: [],
  setSelectedSquares: () => null,
  donationAmount: 0,
  raffleTicketsEarned: 0,
});

export function SquaresProvider({ children }: PropsWithChildren) {
  const [selectedSquares, setSelectedSquares] = useState<number[]>([]);
  const donationAmount = sum(selectedSquares);
  const raffleTicketsEarned = countRaffleTickets(donationAmount);

  return (
    <SquaresContext.Provider
      value={{
        selectedSquares,
        setSelectedSquares,
        donationAmount,
        raffleTicketsEarned,
      }}
    >
      {children}
    </SquaresContext.Provider>
  );
}
