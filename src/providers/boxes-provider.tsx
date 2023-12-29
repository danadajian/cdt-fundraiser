import { createContext, type PropsWithChildren, useState } from "react";

import { countRaffleTickets, sum } from "../utils";

export type BaseImageStateProvider = {
  selectedBoxes: number[];
  setSelectedBoxes: (selectedBoxes: number[]) => void;
  donationAmount: number;
  raffleTicketCount: number;
};

export const BoxesContext = createContext<BaseImageStateProvider>({
  selectedBoxes: [],
  setSelectedBoxes: () => null,
  donationAmount: 0,
  raffleTicketCount: 0,
});

export function BoxesProvider({ children }: PropsWithChildren) {
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const donationAmount = sum(selectedBoxes);
  const raffleTicketCount = countRaffleTickets(donationAmount);

  return (
    <BoxesContext.Provider
      value={{
        selectedBoxes,
        setSelectedBoxes,
        donationAmount,
        raffleTicketCount,
      }}
    >
      {children}
    </BoxesContext.Provider>
  );
}
