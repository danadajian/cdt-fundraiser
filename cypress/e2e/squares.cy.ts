describe("squares", () => {
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

  it("can select and deselect squares", () => {
    cy.findByRole("button", { name: "$5" }).as("square1");
    cy.findByRole("button", { name: "$10" }).as("square2");
    cy.get("@square1").click();
    cy.findByText("Total amount: $5").should("be.visible");
    cy.get("@square2").click();
    cy.findByText("Total amount: $15").should("be.visible");
    cy.get("@square1").click();
    cy.findByText("Total amount: $10").should("be.visible");
  });

  it("prevents me from proceeding to checkout if I have no squares", () => {
    cy.findByRole("button", { name: "Pay Now" }).should("be.disabled");
  });

  it("prevents me from proceeding to checkout if I have some squares but no name", () => {
    cy.findByRole("button", { name: "$5" }).click();
    cy.findByRole("button", { name: "$10" }).click();
    cy.findByRole("button", { name: "Pay Now" }).should("be.disabled");
  });

  it("proceeds to checkout if I have some squares and have entered my name", () => {
    cy.findByRole("button", { name: "$150" }).click();
    cy.findByPlaceholderText("Type your name here").type("My Name");
    cy.findByRole("button", { name: "Pay Now" }).should("be.enabled").click();
    cy.findByRole("heading", { name: /Thanks, My Name/ }).should("be.visible");
    cy.findByRole("link", { name: /Click here to continue/ })
      .should("be.visible")
      .and(
        "have.prop",
        "href",
        "https://www.dortamid.org/form/springfundraiser2024",
      );
  });

  it("notifies me each time I earn a raffle ticket", () => {
    cy.findByText("Raffle tickets earned: 0").should("be.visible");
    cy.findByRole("button", { name: "$25" }).click();
    cy.findByRole("button", { name: "$24" }).click();
    cy.findByText("Raffle tickets earned: 0").should("be.visible");
    cy.findByRole("button", { name: "$2" }).click();
    cy.findByText("Raffle tickets earned: 1").should("be.visible");
    cy.findByRole("button", { name: "$100" }).click();
    cy.findByText("Raffle tickets earned: 3").should("be.visible");
    cy.findByRole("button", { name: "$25" }).click();
    cy.findByText("Raffle tickets earned: 2").should("be.visible");
  });

  it("notifies me when I am close to earning another raffle ticket", () => {
    cy.findByRole("button", { name: "$39" }).click();
    cy.findByText("You are $11 away from earning a raffle ticket!").should(
      "be.visible",
    );
    cy.findByRole("button", { name: "$1" }).click();
    cy.findByText("You are $10 away from earning a raffle ticket!").should(
      "be.visible",
    );
    cy.findByRole("button", { name: "$10" }).click();
    cy.findByText(
      "You are $50 away from earning another raffle ticket!",
    ).should("be.visible");
  });

  it("prevents me from taking a square that has already been taken", () => {
    cy.findByRole("button", { name: "$20" }).as("square").click();
    cy.findByPlaceholderText("Type your name here").type("My Name");
    cy.findByRole("button", { name: "Pay Now" }).click();
    cy.reload();
    cy.get("@square").should("not.exist");
    cy.findByAltText("flame-20").should("be.visible");
  });
});
