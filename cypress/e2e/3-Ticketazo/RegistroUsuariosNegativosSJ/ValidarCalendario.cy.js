describe("Validaciones negativas del calendario", () => {
    beforeEach(() => {
      cy.visit("https://ticketazo.com.ar/auth/registerUser");
    });
  
    // 1. No debe aceptar letras en el campo día
    it("No debe aceptar letras en el campo día", () => {
      cy.get('[data-type="day"]').type("aa");
      cy.get('[data-type="day"]').should("not.contain.text", "aa");
    });
  
    // 2. No debe permitir un día mayor a 31
    it("No debe aceptar día mayor a 31", () => {
      cy.get('[data-type="day"]').type("45");
      cy.get('[data-type="day"]').should("not.contain.text", "45");
    });
  
    // 3. No debe permitir un mes mayor a 12
    it("No debe aceptar mes mayor a 12", () => {
      cy.get('[data-type="month"]').type("13");
      cy.get('[data-type="month"]').should("not.contain.text", "13");
    });
  });