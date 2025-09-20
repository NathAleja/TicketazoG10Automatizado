describe('Registro Usuario - Año inválido en fecha de nacimiento', () => {
    const POTicketazo = 'InvalidBirthYear';
    let peInvalidBirthYear;

    beforeEach(() => {
        cy.fixture(POTicketazo).then(($json) => {
            peInvalidBirthYear = $json;
        });
        cy.visit('https://ticketazo.com.ar/auth/registerUser');
    });

    function getUniqueDni() {
        return `${Math.floor(10000000 + Math.random() * 89999999)}`;
    }

    function getUniqueEmail() {
        return `juan.perez+${Date.now()}@mail.com`;
    }

    it('No debería permitir año 1', () => { // Este caso falla, bug, permite registrarse
        cy.get(peInvalidBirthYear.txt_Name).type(peInvalidBirthYear.data.Name);
        cy.get(peInvalidBirthYear.txt_LastName).type(peInvalidBirthYear.data.LastName);
        cy.get(peInvalidBirthYear.txt_Phone).type(peInvalidBirthYear.data.Phone);
        cy.get(peInvalidBirthYear.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidBirthYear.cmb_Province).click();
        cy.get(peInvalidBirthYear.cmb_Province).type(peInvalidBirthYear.data.Province + '{enter}');
        cy.get(peInvalidBirthYear.cmb_Location).click();
        cy.get(peInvalidBirthYear.cmb_Location).type(peInvalidBirthYear.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidBirthYear.dataError.Year1);
        const email = getUniqueEmail();
        cy.get(peInvalidBirthYear.txt_Email).click();
        cy.get(peInvalidBirthYear.txt_Email).type(email);
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).click();
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).type(email);
        cy.get(peInvalidBirthYear.txt_Password).type('Prueba12!');
        cy.get(peInvalidBirthYear.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidBirthYear.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });

    it('No debería permitir año 130', () => { // Este caso falla, bug, permite registrarse
        cy.get(peInvalidBirthYear.txt_Name).type(peInvalidBirthYear.data.Name);
        cy.get(peInvalidBirthYear.txt_LastName).type(peInvalidBirthYear.data.LastName);
        cy.get(peInvalidBirthYear.txt_Phone).type(peInvalidBirthYear.data.Phone);
        cy.get(peInvalidBirthYear.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidBirthYear.cmb_Province).click();
        cy.get(peInvalidBirthYear.cmb_Province).type(peInvalidBirthYear.data.Province + '{enter}');
        cy.get(peInvalidBirthYear.cmb_Location).click();
        cy.get(peInvalidBirthYear.cmb_Location).type(peInvalidBirthYear.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidBirthYear.dataError.Year130);
        const email = getUniqueEmail();
        cy.get(peInvalidBirthYear.txt_Email).click();
        cy.get(peInvalidBirthYear.txt_Email).type(email);
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).click();
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).type(email);
        cy.get(peInvalidBirthYear.txt_Password).type('Prueba12!');
        cy.get(peInvalidBirthYear.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidBirthYear.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });

    it('No debería permitir año 1700', () => { // Este caso falla, bug, permite registrarse
        cy.get(peInvalidBirthYear.txt_Name).type(peInvalidBirthYear.data.Name);
        cy.get(peInvalidBirthYear.txt_LastName).type(peInvalidBirthYear.data.LastName);
        cy.get(peInvalidBirthYear.txt_Phone).type(peInvalidBirthYear.data.Phone);
        cy.get(peInvalidBirthYear.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidBirthYear.cmb_Province).click();
        cy.get(peInvalidBirthYear.cmb_Province).type(peInvalidBirthYear.data.Province + '{enter}');
        cy.get(peInvalidBirthYear.cmb_Location).click();
        cy.get(peInvalidBirthYear.cmb_Location).type(peInvalidBirthYear.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidBirthYear.dataError.Year1700);
        const email = getUniqueEmail();
        cy.get(peInvalidBirthYear.txt_Email).click();
        cy.get(peInvalidBirthYear.txt_Email).type(email);
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).click();
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).type(email);
        cy.get(peInvalidBirthYear.txt_Password).type('Prueba12!');
        cy.get(peInvalidBirthYear.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidBirthYear.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });

    it('No debería permitir año 2099', () => { // Este caso pasa, porque está validado en el front
        cy.get(peInvalidBirthYear.txt_Name).type(peInvalidBirthYear.data.Name);
        cy.get(peInvalidBirthYear.txt_LastName).type(peInvalidBirthYear.data.LastName);
        cy.get(peInvalidBirthYear.txt_Phone).type(peInvalidBirthYear.data.Phone);
        cy.get(peInvalidBirthYear.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidBirthYear.cmb_Province).click();
        cy.get(peInvalidBirthYear.cmb_Province).type(peInvalidBirthYear.data.Province + '{enter}');
        cy.get(peInvalidBirthYear.cmb_Location).click();
        cy.get(peInvalidBirthYear.cmb_Location).type(peInvalidBirthYear.data.Location + '{enter}');
        cy.contains("dd").type(peInvalidBirthYear.dataError.Year2099);
        const email = getUniqueEmail();
        cy.get(peInvalidBirthYear.txt_Email).click();
        cy.get(peInvalidBirthYear.txt_Email).type(email);
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).click();
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).type(email);
        cy.get(peInvalidBirthYear.txt_Password).type('Prueba12!');
        cy.get(peInvalidBirthYear.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidBirthYear.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });

    it('No debería permitir fecha de nacimiento mayor a la actual', () => { // Caso para validar fecha futura, no solo año.
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const year = tomorrow.getFullYear();
        const futureDate = `${day}/${month}/${year}`;

        cy.get(peInvalidBirthYear.txt_Name).type(peInvalidBirthYear.data.Name);
        cy.get(peInvalidBirthYear.txt_LastName).type(peInvalidBirthYear.data.LastName);
        cy.get(peInvalidBirthYear.txt_Phone).type(peInvalidBirthYear.data.Phone);
        cy.get(peInvalidBirthYear.txt_Dni).type(getUniqueDni());
        cy.get(peInvalidBirthYear.cmb_Province).click();
        cy.get(peInvalidBirthYear.cmb_Province).type(peInvalidBirthYear.data.Province + '{enter}');
        cy.get(peInvalidBirthYear.cmb_Location).click();
        cy.get(peInvalidBirthYear.cmb_Location).type(peInvalidBirthYear.data.Location + '{enter}');
        cy.contains("dd").type(futureDate);
        const email = getUniqueEmail();
        cy.get(peInvalidBirthYear.txt_Email).click();
        cy.get(peInvalidBirthYear.txt_Email).type(email);
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).click();
        cy.get(peInvalidBirthYear.txt_ConfirmarEmail).type(email);
        cy.get(peInvalidBirthYear.txt_Password).type('Prueba12!');
        cy.get(peInvalidBirthYear.txt_ConfirmPassword).type('Prueba12!');
        cy.get(peInvalidBirthYear.btn_Registrarse).click();
        cy.get('[data-cy="error-message"], [data-invalid="true"]').should('exist');
        cy.wait(1000);
    });
});