describe('Buying and Register Process', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/');
  });
  const REGISTER_API_PATTERN = "api/backend/register/register-user";

  it('selecting an event and a ticket', () => {
    cy.intercept("POST", REGISTER_API_PATTERN).as("register");
    // Select an event
    cy.get('[data-cy="btn-ver-evento-7"]').click();
    // click on 'Adquirir entrada' button wich contains the text 'Adquirir entrada'
    cy.get('button').contains('Adquirir entrada').click();

    // Proceed to registration, doing click on the button that contains the text '¿No tienes cuenta? Registrate!'
    cy.get('button').contains('¿No tienes cuenta? Registrate!').click();

    // generate unique email and DNI
    const timestamp = Date.now();
    const email = `jhon.doe+${timestamp}@example.com`;
    const dni = String(Math.floor(10000000 + Math.random() * 90000000));

    // full form
    cy.get('[data-cy="input-nombres"]').type("Jhon");
    cy.get('[data-cy="input-apellido"]').type("Doe");
    cy.get('[data-cy="input-telefono"]').type("3511234567");
    cy.get('[data-cy="input-dni"]').type(dni);
    cy.get('[data-cy="select-provincia"]').type("Córdoba{enter}");
    cy.get('[data-cy="select-localidad"]').type("Córdoba{enter}");
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').type("1");
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').type("1");
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').type(
      "2000"
    );
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-confirmar-email"]').type(email);
    cy.get('[data-cy="input-password"]').type("Qa!12345", { log: false });
    cy.get('[data-cy="input-repetir-password"]').type("Qa!12345", {
      log: false,
    });

    // Send form
    cy.get('[data-cy="btn-registrarse"]').click();

    // check that the API responded correctly
    cy.wait("@register")
      .its("response.statusCode")
      .should("be.oneOf", [200, 201]);
    // wait for redirection to login page
    cy.url().should('include', '/auth/login');

    

    // Log in process after registration should be here
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-password"]').type("Qa!12345", { log: false });
    cy.get('[data-cy="btn-login"]').click();
     // We need to confirm the email to be able to log in, message should appear
    cy.contains('Usuario no confirmado. Te reenviamos el link por correo.').should('be.visible');
    // Since we can't access the email, we will assume the registration was successful if we reach the login page
    // In a real scenario, we would use an email testing service to confirm the email and get the confirmation link
    // For the sake of this test, we will proceed to log in with the newly created user
    // Verify that we are logged in by checking the URL or presence of a logout button

  });
});