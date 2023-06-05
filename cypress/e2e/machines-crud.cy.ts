describe('CRUD Machines', () => {
  beforeEach(() => {
    cy.login("admin", "test", "Admin");
  })
  it('creates a machine', () => {

    cy.visit('https://localhost:4200/dashboard')

    cy.get('.cy-machines').click()

    cy.url().should('include', '/machines')

    cy.get('.cy-newmachine').type('Test Machine')

    cy.get('.cy-newmachine').should('have.value', 'Test Machine')

    cy.get('.cy-add').click()

    cy.get('.cy-machines').children().contains('Test Machine')
  })
  
  it('updates a machine', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.get('.cy-machines').click()

    cy.url().should('include', '/machines')

    cy.get('.cy-machines').children().contains('Test Machine').click()

    cy.get('.cy-nameinput').clear()

    cy.get('.cy-nameinput').type('Updated value')

    cy.contains('save').click()

    cy.get('.cy-machines').children().contains('Updated value')
  })

  it('deletes a part', () => {
    cy.visit('https://localhost:4200/dashboard')

    cy.get('.cy-machines').click()

    cy.url().should('include', '/machines')

    cy.get('.cy-machines').children().contains('Updated value').siblings().contains('x').click()

    cy.get('.cy-machines').children().contains('Updated value').should('not.exist')
  })

})