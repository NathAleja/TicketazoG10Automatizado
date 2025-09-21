describe("Registro de nuevo usuario - Fecha de nacimiento dentro del rango válido", () => {
  const REGISTER_URL = "https://ticketazo.com.ar/auth/registerUser";
  const REGISTER_API_PATTERN = "api/backend/register/register-user";

  it("Registra un usuario mayor de 18 años y menor de 100 años correctamente", () => {
    cy.intercept("POST", REGISTER_API_PATTERN).as("register");
    cy.visit(REGISTER_URL);

    // Generar email y DNI únicos
    const timestamp = Date.now();
    const email = `usuario.qa+${timestamp}@example.com`;
    const dni = String(Math.floor(10000000 + Math.random() * 90000000));

    // Completar formulario
    cy.get('[data-cy="input-nombres"]').type("Lynn");
    cy.get('[data-cy="input-apellido"]').type("Alanes");
    cy.get('[data-cy="input-telefono"]').type("3511234567");
    cy.get('[data-cy="input-dni"]').type(dni);

    // Provincia y Localidad válidas
    cy.get('[data-cy="select-provincia"]').type("Córdoba{enter}");
    cy.get('[data-cy="select-localidad"]').type("Córdoba{enter}");

    // Fecha de nacimiento válida: mayor de 18 y menor de 100 años
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').type("01");
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').type("01");
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').type(
      "1950"
    );

    // Email y contraseña
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-confirmar-email"]').type(email);
    cy.get('[data-cy="input-password"]').type("Qa!12345", { log: false });
    cy.get('[data-cy="input-repetir-password"]').type("Qa!12345", {
      log: false,
    });

    // Enviar formulario
    cy.get('[data-cy="btn-registrarse"]').click();

    // Validar que la API respondió con éxito
    cy.wait("@register")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);
  });
});
