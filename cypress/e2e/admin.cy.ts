describe('Админка', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080/admin')
    cy.login()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
  })

  it('Создание статьи', () => {
    cy.get('.MuiButton-root').click()

    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').type('Test cypress')
    cy.get('.MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').type('Test cypress')
    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiOutlinedInput-root').type('Test cypress')
    cy.get(':nth-child(4) > .MuiFormControl-root > .MuiOutlinedInput-root').type('Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress Test cypress ')
    cy.get('.MuiCardContent-root > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiOutlinedInput-input').attachFile('1.jpg')

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000)

    cy.get('.MuiButton-root').click()

    cy.get('.MuiListItemButton-root').click()
    cy.contains('Test cypress').should('exist')

    cy.contains('Test cypress').click()
    cy.get('#long-button').click()
    cy.get('.MuiMenuItem-root').click()

    cy.get('.MuiListItemButton-root').click({force: true})
    cy.contains('Test cypress').should('not.exist')
  })

})