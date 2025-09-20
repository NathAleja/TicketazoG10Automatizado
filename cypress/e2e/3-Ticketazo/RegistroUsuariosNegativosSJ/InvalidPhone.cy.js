describe('Registro Usuario - Teléfono con menos de 10 dígitos', () => {
    const POTicketazo = 'InvalidPhone';
    let peInvalidPhone;

    beforeEach(() => {
        cy.fixture(POTicketazo).then(($json) => {
            peInvalidPhone = $json;
        });
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    function getUniqueDni() {
        return `${Math.floor(10000000 + Math.random() * 89999999)}`;
    }

    function getUniqueEmail() {
        return `juan.perez+${Date.now()}@mail.com`;
    }

    it('No debería permitir registro con teléfono de menos de 10 dígitos', () => {
        cy.get(peInvalidPhone.txt_Name).type(peInvalidPhone.data.Name);
        cy.get(peInvalidPhone.txt_LastName).type(peInvalidPhone.data.LastName);
        cy.get(peInvalidPhone.txt_Phone).type(peInvalidPhone.data.Phone);
        cy.get(peInvalidPhone.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidPhone.cmb_Province).click();
        cy.get(peInvalidPhone.cmb_Province).type(peInvalidPhone.data.Province + '{enter}');
        cy.get(peInvalidPhone.cmb_Location).click();
        cy.get(peInvalidPhone.cmb_Location).type(peInvalidPhone.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidPhone.data.Date);
        const email = getUniqueEmail();
        cy.get(peInvalidPhone.txt_Email).click();
        cy.get(peInvalidPhone.txt_Email).type(email);
        cy.get(peInvalidPhone.txt_ConfirmarEmail).click();
        cy.get(peInvalidPhone.txt_ConfirmarEmail).type(email);
        cy.get(peInvalidPhone.txt_Password).type('Prueba12!');
        cy.get(peInvalidPhone.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidPhone.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });
});