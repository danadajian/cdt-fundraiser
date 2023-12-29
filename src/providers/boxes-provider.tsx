import { createContext, type PropsWithChildren, useState } from "react";

export type BaseImageStateProvider = {
  selectedBoxes: number[];
  setSelectedBoxes: (selectedBoxes: number[]) => void;
};

export const BoxesContext = createContext<BaseImageStateProvider>({
  selectedBoxes: [],
  setSelectedBoxes: () => null,
});

export function BoxesProvider({ children }: PropsWithChildren) {
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);

  return (
    <BoxesContext.Provider value={{ selectedBoxes, setSelectedBoxes }}>
      {children}
    </BoxesContext.Provider>
  );
}
