describe("Registro de nuevo usuario", () => {
  const REGISTER_URL = "https://ticketazo.com.ar/auth/registerUser";
  const REGISTER_API_PATTERN = "api/backend/register/register-user";

  it("Registra un usuario correctamente", () => {
    cy.intercept("POST", REGISTER_API_PATTERN).as("register");
    cy.visit(REGISTER_URL);

    // Generar email y DNI únicos
    const timestamp = Date.now();
    const email = `facu.qa+${timestamp}@example.com`;
    const dni = String(Math.floor(10000000 + Math.random() * 90000000));

    // Completar formulario
    cy.get('[data-cy="input-nombres"]').type("Lynn");
    cy.get('[data-cy="input-apellido"]').type("Alanes");
    cy.get('[data-cy="input-telefono"]').type("3511234567");
    cy.get('[data-cy="input-dni"]').type(dni);
    cy.get('[data-cy="select-provincia"]').type("Córdoba{enter}");
    cy.get('[data-cy="select-localidad"]').type("Córdoba{enter}");
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').type("05");
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').type("11");
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').type(
      "1996"
    );
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-confirmar-email"]').type(email);
    cy.get('[data-cy="input-password"]').type("Qa!12345", { log: false });
    cy.get('[data-cy="input-repetir-password"]').type("Qa!12345", {
      log: false,
    });

    // Enviar formulario
    cy.get('[data-cy="btn-registrarse"]').click();

    // Verificar que la API respondió correctamente
    cy.wait("@register")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);
  });
});
