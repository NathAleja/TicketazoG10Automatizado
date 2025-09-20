/// <reference types="cypress" />
const BASE = Cypress.env('BASE_URL') || 'https://ticketazo.com.ar';

describe('Navegación por eventos', () => {

  beforeEach(() => {
    cy.viewport(1280, 720) 
    cy.visit(BASE)
    cy.wait(500)
  })

  it('Ver listado de eventos', () => {
    cy.get('[data-cy="eventos-grid"]').should('exist')
    cy.get('[data-cy="eventos-grid"]')
      .find('[data-cy^="evento-card-"]')
      .should('have.length.greaterThan', 0)
  })

  it('Ver detalle de evento', () => {
    cy.get('[data-cy="eventos-grid"]').should('exist')
    cy.get('[data-cy^="btn-ver-evento"]').first().click()
    cy.get('section[role="dialog"][data-open="true"]').should('be.visible')
    cy.get('h1').should('be.visible')
    cy.contains('button', 'Adquirir entrada')
      .scrollIntoView()
      .should('be.visible')
      .click()
    cy.get('section[role="dialog"]').should('not.exist')
  })

  it('Filtrar eventos por categoría', () => {
    cy.get('[data-cy^="evento-card-"]')
      .its('length')
      .then((cantidadInicial) => {
        cy.get('button[aria-label="Categoría"]').click({ force: true })
        cy.contains('[role="option"]', 'Recital').click({ force: true })
        cy.get('button[aria-label="Categoría"] span[data-slot="value"]')
          .should('contain.text', 'Recital')

        cy.wait(2000)

        cy.get('body').then(($body) => {
          if ($body.find('.pagination, [data-cy="pagination"]').length) {
            cy.get('.pagination, [data-cy="pagination"]')
              .should('contain.text', '3')
              .or(() => {
                cy.get('[data-cy^="evento-card-"]')
                  .its('length')
                  .should('be.lessThan', cantidadInicial)
              })
          }
        })
      })
  })

  it('Paginación de resultados de filtros', () => {
    cy.get('button[aria-label="Categoría"]').click({ force: true })
    cy.contains('[role="option"]', 'Recital').click({ force: true })

    cy.get('button[aria-label="Categoría"] span[data-slot="value"]')
    .should('contain.text', 'Recital')

    cy.wait(2000) 

    cy.get('li[role="button"][data-slot="item"]').then(($pages) => {
    const totalPages = $pages.length
      cy.log(`Se encontraron ${totalPages} páginas`)

      for (let i = 2; i <= totalPages; i++) {
        cy.contains('li[role="button"]', i).click({ force: true })

        cy.contains('li[role="button"]', i)
        .should('have.attr', 'data-active', 'true')

        cy.get('button[aria-label="Categoría"] span[data-slot="value"]')
        .should('contain.text', 'Recital')

        cy.get('[data-cy^="evento-card-"]').should('have.length.greaterThan', 0)
      }
    })
    })
  it('Lista de eventos vacía', () => {
    cy.intercept('GET', '**/api/backend/events*', {
      statusCode: 200,
      body: { 
      data: [], 
      total: 0, 
      page: 1, 
      perPage: 10 
     }
    }).as('getEventosVacio')

    cy.visit(BASE)
    cy.wait('@getEventosVacio')

    cy.validarEventosGrid(0)
  })
})
