describe("boxes", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays an 18x20 table with numbers in reverse order", () => {
    cy.findByRole("table").should("be.visible");
    cy.findAllByRole("row").should("be.visible").and("have.length", 18);
    cy.findAllByRole("cell").should("be.visible").and("have.length", 360);
    cy.findAllByRole("cell").first().should("have.text", "$360");
    cy.findAllByRole("cell").last().should("have.text", "$1");
  });

  it("can select and deselect boxes", () => {
    cy.findByRole("button", { name: "$5" }).as("box1");
    cy.findByRole("button", { name: "$10" }).as("box2");
    cy.get("@box1").click();
    cy.findByText("Total amount: $5").should("be.visible");
    cy.get("@box2").click();
    cy.findByText("Total amount: $15").should("be.visible");
    cy.get("@box1").click();
    cy.findByText("Total amount: $10").should("be.visible");
  });
});
