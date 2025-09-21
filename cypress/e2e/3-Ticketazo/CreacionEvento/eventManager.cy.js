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
        
        // Lets try by clicking on the button aria label "Toggle menu"
        cy.get('[aria-label="Toggle menu"]').click();
        cy.get(':nth-child(3) > .pb-4').click();
        
        // Now we are in the event manager creation page
        cy.url().should('include', '/newEvent');
        
        // Fill in event manager form
        cy.get('[data-cy="input-titulo"]').type('Evento de prueba');
    
        cy.get('[data-type="day"]').type('12');
        cy.get('[data-type="month"]').type('12');
        cy.get('[data-type="year"]').type('2025');
        
        // Select age of event type "18+"
        cy.get('[data-cy="select-edad"]').click();
        cy.get('[data-cy="option-edad-ATP"]').click();
        cy.get('[data-cy="select-genero"]').click();
        cy.get('[data-cy="option-genero-StandUp"]').click();

        // ======================
        // HORARIO DE INICIO 02:30
        // ======================

        // Hora de inicio = 02
        cy.get('div[data-type="hour"][contenteditable="true"]').eq(0).then($el => {
            const el = $el[0];
            el.textContent = '02';
            el.setAttribute('aria-valuenow', '2');
            el.setAttribute('aria-valuetext', '02');
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true }));
        });

        // Minutos de inicio = 30
        cy.get('div[data-type="minute"][contenteditable="true"]').eq(0).then($el => {
            const el = $el[0];
            el.textContent = '30';
            el.setAttribute('aria-valuenow', '30');
            el.setAttribute('aria-valuetext', '30');
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true }));
        });

        // ======================
        // DURACIÓN DEL EVENTO 01:15
        // ======================

        // Hora duración = 01
        cy.get('div[data-type="hour"][contenteditable="true"]').eq(1).then($el => {
            const el = $el[0];
            el.textContent = '01';
            el.setAttribute('aria-valuenow', '1');
            el.setAttribute('aria-valuetext', '01');
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true }));
        });

        // Minutos duración = 15
        cy.get('div[data-type="minute"][contenteditable="true"]').eq(1).then($el => {
            const el = $el[0];
            el.textContent = '15';
            el.setAttribute('aria-valuenow', '15');
            el.setAttribute('aria-valuetext', '15');
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true }));
        });

        // Fill in location
        cy.get('[data-cy="select-lugar-evento"]').click();
        cy.get('[data-cy="option-lugar-7"]').click();
        cy.get('[data-cy="input-nombre-lugar"]').type('El galpón de la joda');
        cy.get('[data-cy="input-calle-lugar"]').type('avenida siempre viva');
        cy.get('[data-cy="input-altura-lugar"]').type('742');
        cy.get('[data-cy="input-codigo-postal-lugar"]').type('5151');
        cy.get('[name="provincia"]').type('Córdoba');
        cy.get('[name="provincia"]').type('{enter}');
        // Get the localidad field by its placeholder (Seleccione una localidad) and type "Córdoba"
        cy.get('input[placeholder="Seleccione una localidad"]').type('Córdoba');
        cy.get('input[placeholder="Seleccione una localidad"]').type('{enter}');
        cy.get('[data-cy="input-info"]').type('Cerca del faro que tiene forma de faso');
        cy.get('body').type('{esc}'); // Close any open dropdowns by pressing Escape key

        // Click on "Siguiente" button to proceed
        cy.get('.rounded-b-large > .z-0').click({ force: true });
        // and then... right here the test ends because "Siguiente" button is clickable but nothing happens




    });
});