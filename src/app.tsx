import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorPage } from "./components/error";
import { Loader } from "./components/loader";
import { Message } from "./components/message";
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
      <body className="flex h-screen flex-col items-center bg-[url('/public/background.jpg')] pt-16 text-center">
        <ErrorBoundary
          fallbackRender={({ error }) => <ErrorPage error={error as Error} />}
        >
          <TrpcProvider>
            <Suspense fallback={<Loader />}>
              <SquaresProvider>
                <Message />
                <Payment />
                <Squares />
              </SquaresProvider>
            </Suspense>
          </TrpcProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};
