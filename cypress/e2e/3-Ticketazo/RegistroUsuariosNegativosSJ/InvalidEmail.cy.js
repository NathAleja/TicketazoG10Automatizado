describe('Registro Usuario - Emails inválidos', () => {
    const POTicketazo = 'InvalidEmail';
    let peInvalidEmail;

    beforeEach(() => {
        cy.fixture(POTicketazo).then(($json) => {
            peInvalidEmail = $json;
        });
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    function getUniqueDni() {
        return `${Math.floor(10000000 + Math.random() * 89999999)}`;
    }

    it('No debería permitir registro con email sin @', () => {
        cy.get(peInvalidEmail.txt_Name).type(peInvalidEmail.data.Name);
        cy.get(peInvalidEmail.txt_LastName).type(peInvalidEmail.data.LastName);
        cy.get(peInvalidEmail.txt_Phone).type(peInvalidEmail.data.Phone);
        cy.get(peInvalidEmail.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidEmail.cmb_Province).click();
        cy.get(peInvalidEmail.cmb_Province).type(peInvalidEmail.data.Province + '{enter}');
        cy.get(peInvalidEmail.cmb_Location).click();
        cy.get(peInvalidEmail.cmb_Location).type(peInvalidEmail.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidEmail.data.Date);
        cy.get(peInvalidEmail.txt_Email).click();
        cy.get(peInvalidEmail.txt_Email).type(peInvalidEmail.dataError.SinArroba);
        cy.get(peInvalidEmail.txt_ConfirmarEmail).click();
        cy.get(peInvalidEmail.txt_ConfirmarEmail).type(peInvalidEmail.dataError.SinArroba);
        cy.get(peInvalidEmail.txt_Password).type('Prueba12!');
        cy.get(peInvalidEmail.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidEmail.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });

    it('No debería permitir registro con email sin texto después del @', () => {
        cy.get(peInvalidEmail.txt_Name).type(peInvalidEmail.data.Name);
        cy.get(peInvalidEmail.txt_LastName).type(peInvalidEmail.data.LastName);
        cy.get(peInvalidEmail.txt_Phone).type(peInvalidEmail.data.Phone);
        cy.get(peInvalidEmail.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidEmail.cmb_Province).click();
        cy.get(peInvalidEmail.cmb_Province).type(peInvalidEmail.data.Province + '{enter}');
        cy.get(peInvalidEmail.cmb_Location).click();
        cy.get(peInvalidEmail.cmb_Location).type(peInvalidEmail.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidEmail.data.Date);
        cy.get(peInvalidEmail.txt_Email).click();
        cy.get(peInvalidEmail.txt_Email).type(peInvalidEmail.dataError.SinTextoDespuesArroba);
        cy.get(peInvalidEmail.txt_ConfirmarEmail).click();
        cy.get(peInvalidEmail.txt_ConfirmarEmail).type(peInvalidEmail.dataError.SinTextoDespuesArroba);
        cy.get(peInvalidEmail.txt_Password).type('Prueba12!');
        cy.get(peInvalidEmail.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidEmail.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });

    it('No debería permitir registro con email que termina en punto', () => {
        cy.get(peInvalidEmail.txt_Name).type(peInvalidEmail.data.Name);
        cy.get(peInvalidEmail.txt_LastName).type(peInvalidEmail.data.LastName);
        cy.get(peInvalidEmail.txt_Phone).type(peInvalidEmail.data.Phone);
        cy.get(peInvalidEmail.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidEmail.cmb_Province).click();
        cy.get(peInvalidEmail.cmb_Province).type(peInvalidEmail.data.Province + '{enter}');
        cy.get(peInvalidEmail.cmb_Location).click();
        cy.get(peInvalidEmail.cmb_Location).type(peInvalidEmail.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidEmail.data.Date);
        cy.get(peInvalidEmail.txt_Email).click();
        cy.get(peInvalidEmail.txt_Email).type(peInvalidEmail.dataError.TerminaEnPunto);
        cy.get(peInvalidEmail.txt_ConfirmarEmail).click();
        cy.get(peInvalidEmail.txt_ConfirmarEmail).type(peInvalidEmail.dataError.TerminaEnPunto);
        cy.get(peInvalidEmail.txt_Password).type('Prueba12!');
        cy.get(peInvalidEmail.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidEmail.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });


    it('No debería permitir registro con email con símbolo no permitido', () => {
        cy.get(peInvalidEmail.txt_Name).type(peInvalidEmail.data.Name);
        cy.get(peInvalidEmail.txt_LastName).type(peInvalidEmail.data.LastName);
        cy.get(peInvalidEmail.txt_Phone).type(peInvalidEmail.data.Phone);
        cy.get(peInvalidEmail.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidEmail.cmb_Province).click();
        cy.get(peInvalidEmail.cmb_Province).type(peInvalidEmail.data.Province + '{enter}');
        cy.get(peInvalidEmail.cmb_Location).click();
        cy.get(peInvalidEmail.cmb_Location).type(peInvalidEmail.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidEmail.data.Date);
        cy.get(peInvalidEmail.txt_Email).click();
        cy.get(peInvalidEmail.txt_Email).type(peInvalidEmail.dataError.SimboloNoPermitido);
        cy.get(peInvalidEmail.txt_ConfirmarEmail).click();
        cy.get(peInvalidEmail.txt_ConfirmarEmail).type(peInvalidEmail.dataError.SimboloNoPermitido);
        cy.get(peInvalidEmail.txt_Password).type('Prueba12!');
        cy.get(peInvalidEmail.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidEmail.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });
});