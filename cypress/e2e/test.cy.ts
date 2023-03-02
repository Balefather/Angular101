describe('CRUD Heroes', () => {
  it('creates a hero', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.contains('Heroes').click()

    cy.url().should('include', '/heroes')

    cy.get('#new-hero').type('Test Hero')

    cy.get('#new-hero').should('have.value', 'Test Hero')

    cy.contains('Add hero').click()

    cy.get('.heroes').children().contains('Test Hero')
  })
  
  it('updates a hero', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.contains('Heroes').click()

    cy.url().should('include', '/heroes')

    cy.get('#new-hero').type('Test Hero')

    cy.get('#new-hero').should('have.value', 'Test Hero')

    cy.contains('Add hero').click()

    cy.get('.heroes').children().contains('Test Hero')

    cy.get('.heroes').children().contains('Test Hero').click()

    cy.get('#hero-name').clear()

    cy.get('#hero-name').type('Updated value')

    cy.contains('save').click()

    cy.get('.heroes').children().contains('Updated value')
  })

  it('deletes a hero', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.contains('Heroes').click()

    cy.url().should('include', '/heroes')

    cy.get('#new-hero').type('Test Hero')

    cy.get('#new-hero').should('have.value', 'Test Hero')

    cy.contains('Add hero').click()

    cy.get('.heroes').children().contains('Test Hero').siblings().contains('x').click()

    cy.get('.heroes').children().contains('Test Hero').should('not.exist')
  })

})