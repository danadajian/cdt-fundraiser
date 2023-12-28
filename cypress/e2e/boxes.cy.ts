describe("boxes", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("has the correct table format", () => {
    cy.findByRole("table").should("be.visible");
    cy.findAllByRole("row").should("be.visible").and("have.length", 18);
    cy.findAllByRole("cell").should("be.visible").and("have.length", 360);
  });

  it("displays the cells in reverse order", () => {
    cy.findAllByRole("cell").first().should("have.text", "360");
    cy.findAllByRole("cell").last().should("have.text", "1");
  });
});
