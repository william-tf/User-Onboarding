

describe('name input test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termsInput = () => cy.get('input[name=terms]')
    

    it('name checker', () => {
        nameInput()
        .should('have.value', '')
        .type('test')
        .should('have.value', 'test')
    })

    it('email checker', () => {
        emailInput()
        .should('have.value', '')
        .type('test@test.com')
        .should('have.value', 'test@test.com')
    })

    it('password checker', () => {
        passwordInput()
        .should('have.value', '')
        .type('password')
        .should('have.value', 'password') 
    })

    it('terms checker', () => {
        termsInput()
        .should('not.have.checked', true)
        .click()
        .should('have.checked', true)
        
    })

    describe('submit checker', () => {
        const submitBtn = () => cy.get('button[name=submit]')
         const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termsInput = () => cy.get('input[name=terms]')
    
        it('submit pre input works', () => {
            submitBtn()
            .should('be.disabled')
        })
        it('submit post input', () =>{
            nameInput()
            .type('testing')
            emailInput()
            .type('test@gmail.com')
            passwordInput()
            .type('12345678')
            termsInput()
            .click()
            submitBtn()
            .should('be.enabled')
        })
        it('validation', () => {
            nameInput()
            .type('testing')
            emailInput()
            .type('test@gmail.com')
            passwordInput()
            .type('12345')
            termsInput()
            .click()
            submitBtn()
            .should('be.disabled')
        })
    })

})

