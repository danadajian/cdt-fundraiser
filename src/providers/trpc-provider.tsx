import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import { type PropsWithChildren, useState } from "react";

import { trpc } from "../trpc";

export const TrpcProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            placeholderData: keepPreviousData,
            staleTime: 1000 * 60 * 5, // 5 minutes
            throwOnError: true,
            retry: false,
          },
        },
      }),
  );
  const baseUrl =
    typeof window === "undefined" ? `http://localhost:${process.env.PORT}` : "";
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseUrl}/trpc`,
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
