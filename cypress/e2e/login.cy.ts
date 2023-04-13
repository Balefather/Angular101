describe('Login', () => {
    beforeEach(() => {
/*       cy.login("username", "password"); */

    })
    it('verify non logged in user cant do anything', () => {
      cy.visit('https://localhost:4200/dashboard');
      cy.get('.nav-item-parts').should('not.exist');
      cy.get('.nav-item-machines').should('not.exist');
      cy.get('.nav-item-services').should('not.exist');
      cy.get('#search-bar').should('not.exist');
    })
    it('Light user rights', () => {
        cy.login("user", "test", "Light User");
        cy.visit('https://localhost:4200/dashboard');
        cy.get('.nav-item-parts').should('not.exist');
        cy.get('.nav-item-machines').should('not.exist');
        cy.get('.nav-item-services').should('exist');
        cy.get('app-search-bar').should('exist');
    })
    it('Admin user can do anything', () => {
        cy.login("admin", "test", "Admin");
        cy.visit('https://localhost:4200/dashboard');
        cy.get('.nav-item-parts').should('exist');
        cy.get('.nav-item-machines').should('exist');
        cy.get('.nav-item-services').should('exist');
        cy.get('app-search-bar').should('exist');
    })
    
  })