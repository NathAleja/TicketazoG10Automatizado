describe('Compra sin registro', () => {
  it('passes', () => {
    cy.visit('https://ticketazo.com.ar/')
cy.get('[data-cy="btn-ver-evento-8"]').click()
cy.get('.min-w-24').scrollIntoView();
cy.get('.min-w-24').click()
cy.get('.text-foreground').should('be.visible');
  })
})