describe('Registro Usuario - Emails no coinciden', () => {
    const POTicketazo = 'NotMatchingEmail';
    let peNotMatchingEmail;

    beforeEach(() => {
        cy.fixture(POTicketazo).then(($json) => {
            peNotMatchingEmail = $json;
        });
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    function getUniqueDni() {
        return `${Math.floor(10000000 + Math.random() * 89999999)}`;
    }

    it('No debería permitir registro si los emails no coinciden', () => {
        cy.get(peNotMatchingEmail.txt_Name).type(peNotMatchingEmail.data.Name);
        cy.get(peNotMatchingEmail.txt_LastName).type(peNotMatchingEmail.data.LastName);
        cy.get(peNotMatchingEmail.txt_Phone).type(peNotMatchingEmail.data.Phone);
        cy.get(peNotMatchingEmail.txt_Dni).type(getUniqueDni());
        cy.get(peNotMatchingEmail.cmb_Province).click();
        cy.get(peNotMatchingEmail.cmb_Province).type(peNotMatchingEmail.data.Province + '{enter}');
        cy.get(peNotMatchingEmail.cmb_Location).click();
        cy.get(peNotMatchingEmail.cmb_Location).type(peNotMatchingEmail.data.Location + '{enter}');
        cy.contains("dd").type(peNotMatchingEmail.data.Date);
        cy.get(peNotMatchingEmail.txt_Email).click();
        cy.get(peNotMatchingEmail.txt_Email).type(peNotMatchingEmail.dataError.Email);
        cy.get(peNotMatchingEmail.txt_ConfirmarEmail).click();
        cy.get(peNotMatchingEmail.txt_ConfirmarEmail).type(peNotMatchingEmail.dataError.ConfirmarEmail);
        cy.get(peNotMatchingEmail.txt_Password).type('Prueba12!');
        cy.get(peNotMatchingEmail.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peNotMatchingEmail.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });
}); 