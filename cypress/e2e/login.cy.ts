describe('Login', () => {
    beforeEach(() => {
/*       cy.login("username", "password"); */

    })
    it('verify non logged in user cant do anything', () => {
      cy.visit('https://localhost:4200/dashboard');
      cy.get('.cy-parts').should('not.exist');
      cy.get('.cy-machines').should('not.exist');
      cy.get('.cy-services').should('not.exist');
      cy.get('.cy-search-bar').should('not.exist');
    })
    it('Light user rights', () => {
        cy.login("user", "test", "Light User");
        cy.visit('https://localhost:4200/dashboard');
        cy.get('.cy-parts').should('not.exist');
        cy.get('.cy-machines').should('not.exist');
        cy.get('.cy-services').should('exist');
        cy.get('.cy-search-bar').should('exist');
    })
    it('Admin user can do anything', () => {
        cy.login("admin", "test", "Admin");
        cy.visit('https://localhost:4200/dashboard');
        cy.get('.cy-parts').should('exist');
        cy.get('.cy-machines').should('exist');
        cy.get('.cy-services').should('exist');
        cy.get('.cy-search-bar').should('exist');
    })
    it('incorrect login', () => {
        cy.request({
            method: 'POST',
            url: 'https://www.shiggy.dk/api/users/login',
            body: {
              password: 'incorrect',
              username: 'login'
            }
          })
            .should((response) => {
              expect(response.status).to.eq(500); // Replace 201 with the expected status code
            });
    })
    
  })