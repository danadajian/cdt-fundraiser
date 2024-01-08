import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorPage } from "./components/error";
import { Loader } from "./components/loader";
import { Payment } from "./components/payment";
import { Squares } from "./components/squares";
import { SquaresProvider } from "./providers/squares-provider";
import { TrpcProvider } from "./providers/trpc-provider";

export const App = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/public/cdt-flame.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="/public/globals.css" />
        <title>CDT Fundraiser</title>
      </head>
      <body className="flex h-screen flex-col items-center bg-dark-tan pt-16 text-center">
        <ErrorBoundary
          fallbackRender={({ error }) => <ErrorPage error={error as Error} />}
        >
          <TrpcProvider>
            <img
              src="/public/trail-to-365.png"
              alt="header"
              className="max-h-24"
            />
            <Suspense fallback={<Loader />}>
              <SquaresProvider>
                <div className="flex items-center">
                  <Squares />
                  <Payment />
                </div>
              </SquaresProvider>
            </Suspense>
            <img
              src="/public/join-the-expedition.png"
              alt="header"
              className="m-4 max-h-24"
            />
          </TrpcProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};
