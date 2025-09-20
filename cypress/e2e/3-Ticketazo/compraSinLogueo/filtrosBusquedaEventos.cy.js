describe('filtrosBusquedaEventos', () => {

    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar');
        cy.wait(2000);
    })

    
    it('busqueda exitosa (barra de busqueda)', () => {
        // Escribir en la barra de búsqueda
        cy.get('input[placeholder="Busca tu próxima función!"]').type('dasdsa{enter}');
        // Validar que se filtren resultados relacionados
        cy.contains('asd').should('exist'); 
        
    })

       
    it('busqueda exitosa (fechas válidas)', () => {
        
        cy.get('.p-2').click();

        // Selecciona el input de fecha inicio
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('01/11/2025');
        // Selecciona el input de fecha fin
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').last().type('01/11/2025{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('30/11/2025{enter}');

        // Verifica resultados
        cy.wait(4000);
        cy.contains('noviembre de 2025').should('exist');

    })


    it('busqueda no exitosa (fechas expiradas)', () => {
        
        cy.get('.p-2').click();

        // Selecciona el input de fecha inicio
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('01/08/2025');
        // Selecciona el input de fecha fin
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').last().type('01/08/2025{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('30/08/2025{enter}');
        // Verifica resultados
        cy.wait(4000);
        cy.contains('El valor debe ser').should('be.visible');
        cy.contains('agosto de 2025').should('not.exist');

    })


    it('busqueda no exitosa (fecha inicial posterior a fecha final)', () => {
        
        cy.get('.p-2').click();

        // Selecciona el input de fecha inicio
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('01/11/2025');
        // Selecciona el input de fecha fin
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').last().type('18/11/2025{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('15/11/2025{enter}');

        // Verifica resultados
        cy.wait(4000);
        cy.contains('La fecha de inicio debe ser anterior a la fecha de finalización.').should('be.visible');

    })


    it('busqueda no exitosa (fecha inválida con caracteres y/o símbolos)', () => {
        
        cy.get('.p-2').click();

        // Selecciona el input de fecha inicio
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('asd¡*¨[_:');
        // Selecciona el input de fecha fin
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').last().type('asd¡*¨[_:{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('asd¡*¨[_:{enter}');

        // Verifica resultados
        cy.wait(4000);
        cy.contains('dd/mm/aaaa').should('exist');

    })


    it('busqueda exitosa (filtro de categoría)', () => {                    
        cy.get('.p-2').click(); 
        cy.get('.mx-auto > .flex-wrap > :nth-child(2) > .group').click();
        cy.get('.mx-auto > .flex-wrap > :nth-child(2) > .group').type('{downarrow}{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(2) > .group').type('{downarrow}{enter}');
        cy.wait(3000);               
        cy.get('[data-cy="evento-img-6"]').should('exist'); 
        
    })


    it('busqueda exitosa (eventos cercanos)', () => {                     
        cy.get('.p-2').click();
        cy.wait(3000);
        cy.get('#locationFilter').eq(0).click({force: true});
        cy.get('#locationFilter').should('be.checked');
        cy.wait(3000);
        cy.get('input#locationFilter').eq(0).check({ force: true }).trigger('change', { force: true });
        cy.wait(3000);
    })

    
    it('busqueda exitosa (filtro de ubicacion)', () => {                 
        
        cy.intercept('GET', 'api/backend/ubicacion/localidadesConEventos?idProvincia=6').as('buenos_aires');
        cy.get('.p-2').click();
        
        cy.get('.mx-auto > .flex-wrap > :nth-child(4) > .group').type('{downarrow}{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(4) > .group').type('{downarrow}{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(4) > .group').type('{downarrow}{enter}');   
          
        cy.wait('@buenos_aires').then((interception) => {
            expect(interception.response.statusCode).to.eq(200); 
        })
    })




    
    it('limpieza de filtros', () => {                              
        
        cy.get('input[placeholder="Busca tu próxima función!"]').type('asd{enter}');
        cy.contains('asd').should('exist');
        cy.get('.p-2').click();
        
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('01/11/2025');
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').last().type('18/11/2025{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(1) > .flex-col').first().type('15/11/2025{enter}');
        
        cy.get('.mx-auto > .flex-wrap > :nth-child(2) > .group').click(); 
        cy.get('.mx-auto > .flex-wrap > :nth-child(2) > .group').type('{downarrow}{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(2) > .group').type('{downarrow}{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(2) > .group').type('{downarrow}{enter}');   
        
        cy.get('.mx-auto > .flex-wrap > :nth-child(4) > .group').click();
        cy.get('.mx-auto > .flex-wrap > :nth-child(4) > .group').type('{downarrow}{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(4) > .group').type('{downarrow}{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(4) > .group').type('{downarrow}{enter}');
        cy.get('.mx-auto > .flex-wrap > :nth-child(4) > .group').type('{downarrow}{enter}');
        cy.wait(3000);

        cy.get('button').contains('Limpiar filtros').click({force: true});
                  
        cy.get('[data-slot="error-message"]').should('not.exist');
                
    })

}) 


