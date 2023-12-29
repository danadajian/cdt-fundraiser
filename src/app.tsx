import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Boxes } from "./boxes";
import { ErrorPage } from "./error";
import { Payment } from "./payment";
import { BoxesProvider } from "./providers/boxes-provider";
import { ClientProvider } from "./providers/client-provider";

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
      <body>
        <ErrorBoundary
          fallbackRender={({ error }) => <ErrorPage error={error as Error} />}
        >
          <ClientProvider>
            <Suspense fallback={<div>Loading</div>}>
              <div className="flex flex-col items-center pt-16 text-center">
                <BoxesProvider>
                  <Boxes />
                  <Payment />
                </BoxesProvider>
              </div>
            </Suspense>
          </ClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};
