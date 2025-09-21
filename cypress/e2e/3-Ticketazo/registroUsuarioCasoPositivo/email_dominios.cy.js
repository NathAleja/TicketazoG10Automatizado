describe("Email con distintos dominios", () => {
  const emails = [
    `maria.qa+${Date.now()}@yahoo.com`,
    `carlos.qa+${Date.now()}@outlook.com`,
  ];

  emails.forEach((email) => {
    it(`Debe aceptar el dominio de email: ${email.split("@")[1]}`, () => {
      // Interceptar la API antes de visitar
      cy.intercept("POST", "api/backend/register/register-user").as("register");

      cy.visit("https://ticketazo.com.ar/auth/registerUser");

      cy.get('[data-cy="input-nombres"]').type("Lynn");
      cy.get('[data-cy="input-apellido"]').type("Alanes");
      cy.get('[data-cy="input-telefono"]').type("3511234567");
      cy.get('[data-cy="input-dni"]').type(
        `${Math.floor(Math.random() * 100000000)}`
      );
      cy.get('[data-cy="select-provincia"]').type("Córdoba{enter}");
      cy.get('[data-cy="select-localidad"]').type("Córdoba{enter}");
      cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').type("05");
      cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').type(
        "11"
      );
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
});
