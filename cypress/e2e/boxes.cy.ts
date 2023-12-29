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

  it("cannot proceed to checkout if I have no boxes", () => {
    cy.findByRole("button", { name: "Pay Now" }).should("be.disabled");
  });

  it("cannot proceed to checkout if I have some boxes but no name", () => {
    cy.findByRole("button", { name: "$5" }).click();
    cy.findByRole("button", { name: "$10" }).click();
    cy.findByRole("button", { name: "Pay Now" }).should("be.disabled");
  });

  it("can proceed to checkout if I have some boxes and have entered my name", () => {
    cy.findByRole("button", { name: "$5" }).click();
    cy.findByRole("button", { name: "$10" }).click();
    cy.findByPlaceholderText("Type your name here").type("My Name");
    cy.findByRole("button", { name: "Pay Now" }).should("be.enabled").click();
    cy.findByRole("heading", { name: /You've helped us/ }).should("be.visible");
    cy.findByRole("link", { name: /Click here to continue/ })
      .should("be.visible")
      .and("have.prop", "href", "https://www.dortamid.org/missionpossible2")
      .and("have.prop", "target", "_blank");
  });
});
