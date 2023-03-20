describe('CRUD Parts', () => {
  it('creates a part', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.get('.nav-item-parts').click()

    cy.url().should('include', '/parts')

    cy.get('#new-part').type('Test Part')

    cy.get('#new-part').should('have.value', 'Test Part')

    cy.contains('Add part').click()

    cy.get('.parts').children().contains('Test Part')
  })
  
  it('updates a part', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.get('.nav-item-parts').click()

    cy.url().should('include', '/parts')

   /*  cy.get('#new-part').type('Test Part')

    cy.get('#new-part').should('have.value', 'Test Part')

    cy.contains('Add part').click()

    cy.get('.parts').children().contains('Test Part') */

    cy.get('.parts').children().contains('Test Part').click()

    cy.get('#part-name').clear()

    cy.get('#part-name').type('Updated value')

    cy.contains('save').click()

    cy.get('.parts').children().contains('Updated value')
  })

  it('deletes a part', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.get('.nav-item-parts').click()

    cy.url().should('include', '/parts')

/*     cy.get('#new-part').type('Test Part')

    cy.get('#new-part').should('have.value', 'Test Part')

    cy.contains('Add part').click() */

    cy.get('.parts').children().contains('Updated value').siblings().contains('x').click()

    cy.get('.parts').children().contains('Updated value').should('not.exist')
  })

})