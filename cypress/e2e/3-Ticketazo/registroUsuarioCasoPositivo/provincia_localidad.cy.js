describe("Validación Provincia → Localidad: Buenos Aires - Pilar", () => {
  const REGISTER_URL = "https://ticketazo.com.ar/auth/registerUser";

  it("Valida que al seleccionar Buenos Aires aparezca la localidad Pilar", () => {
    cy.visit(REGISTER_URL);

    // Provincia: obtener y escribir
    cy.get('input[aria-label="Provincia"]', { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });

    cy.get('input[aria-label="Provincia"]')
      .should("be.visible")
      .type("Buenos Aires", { force: true });

    // Simular selección con enter en un get separado
    cy.get('input[aria-label="Provincia"]').type("{enter}", { force: true });

    // Localidad: obtener y escribir
    cy.get('input[aria-label="Localidad"]', { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });

    cy.get('input[aria-label="Localidad"]')
      .should("be.visible")
      .type("Pilar", { force: true });

    cy.get('input[aria-label="Localidad"]').type("{enter}", { force: true });
  });
});
