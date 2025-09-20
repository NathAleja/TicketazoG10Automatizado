describe('Event Manager Creation', () => {
    it('should create an event manager successfully', () => {
        // Go to ticketazo.com.ar login page
        cy.visit('https://ticketazo.com.ar/auth/login');
        //define email and password for login
        const email = 'ejemplo@ejemplo.com';
        const password = 'Contra12345!!.';
        // Fill in login form
        cy.get('[data-cy="input-email"]').type(email);
        cy.get('[data-cy="input-password"]').type(password, { log: false });
        cy.get('[data-cy="btn-login"]').click();
        // Go to event manager creation page
        cy.visit('https://ticketazo.com.ar/newEvent');
        // Select multiple event switch on
        cy.get('[data-cy="switch-multifecha"]').click();
        // Fill title field
        cy.get('[data-cy="input-titulo"]').type('Evento de prueba');
        // Select Date and Time for first event writing directly on the date input
        cy.get('[data-cy="datepicker-fecha"]').type('2023-12-01');
    });
});