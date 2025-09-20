Cypress.Commands.add('validarEventosGrid', (expectedMin = 1) => {
  cy.get('[data-cy="eventos-grid"]').should('exist')

  if (expectedMin > 0) {
    cy.get('[data-cy^="evento-card-"]').should('have.length.gte', expectedMin)
  } else {
    cy.get('[data-cy^="evento-card-"]').should('have.length', 0)
  }
})

