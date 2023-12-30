import { createContext, type PropsWithChildren } from "react";

export const BaseUrlContext = createContext<string>("");

export function BaseUrlProvider({
  value,
  children,
}: { value: string } & PropsWithChildren) {
  return (
    <BaseUrlContext.Provider value={value}>{children}</BaseUrlContext.Provider>
  );
}
