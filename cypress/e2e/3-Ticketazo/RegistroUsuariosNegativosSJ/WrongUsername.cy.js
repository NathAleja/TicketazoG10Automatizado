describe('Registro Usuario', () => {
    const POTicketazo = 'WrongUsername';
    let peWrongUsername;


    beforeEach(() => {
        cy.fixture(POTicketazo).then(($json) => { peWrongUsername = $json});
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
   
    })


    it('DNI con menos de 8 números', () => {
        cy.get(peWrongUsername.txt_Name).type(peWrongUsername.data.Name);
        cy.get(peWrongUsername.txt_LastName).type(peWrongUsername.data.LastName);
        cy.get(peWrongUsername.txt_Phone).type(peWrongUsername.data.Phone);
        cy.get(peWrongUsername.txt_Dni).type(peWrongUsername.dataError.DniMinCaracters);
        cy.get(peWrongUsername.cmb_Province).click();
        cy.get(peWrongUsername.cmb_Province).type('Ciudad Autonoma de Buenos Aires{enter}');
        cy.get(peWrongUsername.cmb_Location).click();
        cy.get(peWrongUsername.cmb_Location).type('Recoleta{enter}');
        cy.contains("dd").type('22/05/1998');
        cy.get(peWrongUsername.txt_Email).click();
        cy.get(peWrongUsername.txt_Email).type(peWrongUsername.data.Email);
        cy.get(peWrongUsername.txt_ConfirmarEmail).click();
        cy.get(peWrongUsername.txt_ConfirmarEmail).type(peWrongUsername.data.Email);
        cy.get(peWrongUsername.txt_Password).type('prueba12');
        cy.get(peWrongUsername.txt_ConfirmPassword).type('prueba12');
        cy.get(peWrongUsername.btn_Registrarse).click();
        cy.get('[data-invalid="true"] > .hidden').contains('Utiliza un formato que coincida con el solicitado');
        cy.wait(1000)


    })


    it('Error mínimo de caracteres de password', () => {
        cy.get(peWrongUsername.txt_Name).type(peWrongUsername.data.Name);
        cy.get(peWrongUsername.txt_LastName).type(peWrongUsername.data.LastName);
        cy.get(peWrongUsername.txt_Phone).type(peWrongUsername.data.Phone);
        cy.get(peWrongUsername.txt_Dni).type(peWrongUsername.data.Dni);
        cy.get(peWrongUsername.cmb_Province).click();
        cy.get(peWrongUsername.cmb_Province).type('Ciudad Autonoma de Buenos Aires{enter}');
        cy.get(peWrongUsername.cmb_Location).click();
        cy.get(peWrongUsername.cmb_Location).type('Recoleta{enter}');
        cy.contains("dd").type(peWrongUsername.data.Date);
        cy.get(peWrongUsername.txt_Email).click();
        cy.get(peWrongUsername.txt_Email).type(peWrongUsername.data.Email);
        cy.get(peWrongUsername.txt_ConfirmarEmail).click();
        cy.get(peWrongUsername.txt_ConfirmarEmail).type(peWrongUsername.data.Email);
        cy.get(peWrongUsername.txt_Password).type('prueba1');
        cy.get(peWrongUsername.txt_ConfirmPassword).type('prueba1');
        cy.get(peWrongUsername.btn_Registrarse).click();
        cy.get('[data-cy="error-message"]').contains('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.');
         cy.wait(1000)
    })

    it('Passwords no coinciden', () => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
        cy.get(peWrongUsername.txt_Name).type(peWrongUsername.data.Name);
        cy.get(peWrongUsername.txt_LastName).type(peWrongUsername.data.LastName);
        cy.get(peWrongUsername.txt_Phone).type(peWrongUsername.data.Phone);
        cy.get(peWrongUsername.txt_Dni).type(peWrongUsername.data.Dni);
        cy.get(peWrongUsername.cmb_Province).click();
        cy.get(peWrongUsername.cmb_Province).type('Ciudad Autonoma de Buenos Aires{enter}');
        cy.get(peWrongUsername.cmb_Location).click();
        cy.get(peWrongUsername.cmb_Location).type('Recoleta{enter}');
        cy.contains("dd").type('22/05/1998');
        cy.get(peWrongUsername.txt_Email).click();
        cy.get(peWrongUsername.txt_Email).type(peWrongUsername.data.Email);
        cy.get(peWrongUsername.txt_ConfirmarEmail).click();
        cy.get(peWrongUsername.txt_ConfirmarEmail).type(peWrongUsername.data.Email);
        cy.get(peWrongUsername.txt_Password).type('prueba1');
        cy.get(peWrongUsername.txt_ConfirmPassword).type('prueba12!');
        cy.get(peWrongUsername.btn_Registrarse).click();
        cy.get('[data-cy="error-message"]').contains('Las contraseñas no coinciden')


    })

     it('Username con números y caracteres especiales', () => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
        cy.get(peWrongUsername.txt_Name).type(peWrongUsername.dataError.NameNumbers);
        cy.get(peWrongUsername.txt_LastName).type(peWrongUsername.data.LastName);
        cy.get(peWrongUsername.txt_Phone).type(peWrongUsername.data.Phone);
        cy.get(peWrongUsername.txt_Dni).type(peWrongUsername.data.Dni);
        cy.get(peWrongUsername.cmb_Province).click();
        cy.get(peWrongUsername.cmb_Province).type('Ciudad Autonoma de Buenos Aires{enter}');
        cy.get(peWrongUsername.cmb_Location).click();
        cy.get(peWrongUsername.cmb_Location).type('Recoleta{enter}');
        cy.contains("dd").type('22/05/1998');
        cy.get(peWrongUsername.txt_Email).click();
        cy.get(peWrongUsername.txt_Email).type(peWrongUsername.data.Email);
        cy.get(peWrongUsername.txt_ConfirmarEmail).click();
        cy.get(peWrongUsername.txt_ConfirmarEmail).type(peWrongUsername.data.Email);
        cy.get(peWrongUsername.txt_Password).type('prueba1');
        cy.get(peWrongUsername.txt_ConfirmPassword).type('prueba12!');
        cy.get(peWrongUsername.btn_Registrarse).click();
        cy.get('[data-cy="error-message"]').contains('Las contraseñas no coinciden')


    })



})


//jeje