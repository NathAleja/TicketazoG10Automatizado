describe('compraLogueo', () => {

    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar');
        cy.get('.justify-end > .text-sm').click();
        cy.get('[data-cy="input-email"]').type("maxigm87@hotmail.com");
        cy.get('[data-cy="input-password"]').type("Password_1");
        cy.get('[data-cy="btn-login"]').click();
    })

    
    it('compra exitosa', () => {

        cy.intercept('POST', 'api/backend/qr/generate-gratuita').as('compra_exitosa');
        cy.get('[aria-label="pagination item 6"]').click();
        cy.get('[data-cy="btn-ver-evento-275"]').click();
        cy.get('button').contains('Adquirir entrada').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-continuar"]').click();
        cy.get('.mt-6 > .z-0').click();
        cy.wait('@compra_exitosa').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    })

    
   
    it('intento de compra superando el máximo (4 entradas)', () => {

        cy.get('[aria-label="pagination item 6"]').click();
        cy.get('[data-cy="btn-ver-evento-275"]').click();
        cy.get('button').contains('Adquirir entrada').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="maximo-entradas"]').contains("Máximo de 4 entradas alcanzado.");

    })


    it('intento de compra con temporizador agotado', () => {

        cy.get('[aria-label="pagination item 6"]').click();
        cy.get('[data-cy="btn-ver-evento-275"]').click();
        cy.get('button').contains('Adquirir entrada').click();
        cy.get('[data-cy="btn-sumar-Campo"]').click();
        cy.get('[data-cy="btn-continuar"]').click();
        cy.wait(300000);
        cy.on('window:alert', (mensaje) => {
            expect(mensaje).to.contain('Tu reserva ha vencido. Por favor, vuelve a seleccionar tus entradas.');
          })
        
    })

   
    it('Valida que la fecha de la entrada no esté expirada', () => {
        
        cy.intercept('POST', 'api/backend/qr/generate-gratuita').as('compra_exitosa');
        cy.get('[aria-label="pagination item 4"]').click();
        cy.get('[data-cy="btn-ver-evento-303"]').click();
        cy.get('button').contains('Adquirir entrada').click();
        cy.get('[data-cy="btn-sumar-General"]').click({force: true});
        cy.get('[data-cy="btn-sumar-VIP"]').click();
        cy.get('[data-cy="btn-continuar"]').click();
        cy.get('.mt-6 > .z-0').click();
        cy.wait('@compra_exitosa').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.wait(2000);
        cy.visit('https://ticketazo.com.ar/tickets/list');
        cy.get('[data-cy="btn-ver-entradas-303"]').click();
        cy.get('button').contains('Ver entrada').click();

        // Seleccionar el contenedor de la fecha directamente
        cy.get('div.jsx-5f8db642f9d65369.flex.items-center.space-x-3').invoke('text').then(textoFecha => {
            cy.log('Fecha encontrada:', textoFecha);

        // 👉 Limpieza del texto
        const fechaStr = textoFecha.trim();

        // 👉 Parseo de la fecha en español (ejemplo simple)
        const meses = {
            enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
            julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
        };

        // Extraer día, mes y año (ej: "lunes, 15 de septiembre de 2025")
        const regex = /(\d{1,2}) de (\w+) de (\d{4})/;
        const match = fechaStr.match(regex);

        if (!match) throw new Error(`No se pudo parsear la fecha: ${fechaStr}`);

        const dia = parseInt(match[1], 10);
        const mes = meses[match[2].toLowerCase()];
        const anio = parseInt(match[3], 10);

        const fechaEvento = new Date(anio, mes, dia);

        // 👉 Fecha actual (sin horas)
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        // 👉 Validación
        expect(fechaEvento.getTime()).to.be.greaterThan(hoy.getTime());
        });
                  
    })

}) 