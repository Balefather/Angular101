describe('CRUD Parts', () => {
  beforeEach(() => {
    cy.login("admin", "test", "Admin");
  })
  it('creates a part', () => {

    cy.visit('https://localhost:4200/dashboard')

    cy.get('.cy-parts').click()

    cy.url().should('include', '/parts')

    cy.get('.cy-part-name-input').type('Test Part')

    cy.get('.cy-part-name-input').should('have.value', 'Test Part')

    cy.get('.cy-add').click()

    cy.get('.cy-parts').children().contains('Test Part')
  })
  
  it('updates a part', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.get('.cy-parts').click()

    cy.url().should('include', '/parts')

    cy.get('.cy-parts').children().contains('Test Part').click()

    cy.get('.cy-part-name').clear()

    cy.get('.cy-part-name').type('Updated value')

    cy.contains('save').click()

    cy.get('.cy-parts').children().contains('Updated value')
  })

  it('deletes a part', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.get('.cy-parts').click()

    cy.url().should('include', '/parts')

    cy.get('.cy-parts').children().contains('Updated value').siblings().contains('x').click()

    cy.get('.cy-parts').children().contains('Updated value').should('not.exist')
  })

})