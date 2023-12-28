import "@testing-library/cypress/add-commands";

Cypress.on("uncaught:exception", (err) => {
  return !err.message.match(/hydration|hydrating/i);
});
