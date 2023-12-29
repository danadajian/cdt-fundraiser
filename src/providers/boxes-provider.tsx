import { createContext, type PropsWithChildren, useState } from "react";

import { countRaffleTickets, sum } from "../utils";

export type BaseImageStateProvider = {
  selectedBoxes: number[];
  setSelectedBoxes: (selectedBoxes: number[]) => void;
  donationAmount: number;
  raffleTicketsEarned: number;
};

export const BoxesContext = createContext<BaseImageStateProvider>({
  selectedBoxes: [],
  setSelectedBoxes: () => null,
  donationAmount: 0,
  raffleTicketsEarned: 0,
});

export function BoxesProvider({ children }: PropsWithChildren) {
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const donationAmount = sum(selectedBoxes);
  const raffleTicketsEarned = countRaffleTickets(donationAmount);

  return (
    <BoxesContext.Provider
      value={{
        selectedBoxes,
        setSelectedBoxes,
        donationAmount,
        raffleTicketsEarned,
      }}
    >
      {children}
    </BoxesContext.Provider>
  );
}
