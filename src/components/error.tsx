import { type TRPCClientError } from "@trpc/client";
import React from "react";

import { type AppRouter } from "../router";

export const ErrorPage = ({
  error,
}: {
  error: Error | TRPCClientError<AppRouter>;
}) => (
  <>
    <div className="flex flex-col items-center pt-16 text-center">
      {"data" in error && error.data?.code && (
        <ErrorMessage message={error.data?.code} />
      )}
      <ErrorMessage message={error.message} />
    </div>
  </>
);

export const ErrorMessage = ({ message }: { message: string }) => (
  <p className="pb-8 pt-8 text-lg font-bold text-red-700">{message}</p>
);
