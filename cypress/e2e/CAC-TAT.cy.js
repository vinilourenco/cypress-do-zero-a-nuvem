describe('Central de Atendimento ao Cliente TAT', () => { // describe: Define a suite de testes
  const user = {
    firstName: 'Vinicius',
    lastName: 'Lourenço',
    email: 'vini@gmail.com',
    phone: '19997293051',
    comment: 'Obrigado!'
  }

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => { // it: Define o caso de teste
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  Cypress._.times(5, () => {
    it.only('preenche os campos obrigatórios e envia o formulário', () => {
      cy.clock()
      const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
      cy.get('input[name="firstName"]').type(user.firstName)
      cy.get('input[name="lastName"]').type(user.lastName)
      cy.get('input[type="email"]').type(user.email)
      cy.get('textarea[id="open-text-area"]').invoke('val', longText).should('have.value', longText)
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('input[name="firstName"]').type(user.firstName)
    cy.get('input[name="lastName"]').type(user.lastName)
    cy.get('input[type="email"]').type('vini@')
    cy.get('textarea[id="open-text-area"]').invoke('val', user.comment).should('have.value', user.comment)
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('verifica campo vazio ao digitar valor não-numérico no campo telefone', () => {
    cy.get('input[type="number"]').type('abc')

    cy.get('input[type="number"]').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('input[id="phone-checkbox"]').click()
    cy.get('input[name="firstName"]').type(user.firstName)
    cy.get('input[name="lastName"]').type(user.lastName)
    cy.get('input[type="email"]').type(user.email)
    cy.get('textarea[id="open-text-area"]').invoke('val', user.comment).should('have.value', user.comment)
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[name="firstName"]').type(user.firstName).should('have.value', 'Vinicius')
    cy.get('input[name="lastName"]').type(user.lastName).should('have.value', 'Lourenço')
    cy.get('input[type="email"]').type(user.email).should('have.value', 'vini@gmail.com')
    cy.get('input[type="number"]').type(user.phone).should('have.value', '19997293051')
    cy.get('textarea[id="open-text-area"]').invoke('val', user.comment).should('have.value', 'Obrigado!')

    cy.get('input[name="firstName"]').clear().should('have.value', '')
    cy.get('input[name="lastName"]').clear().should('have.value', '')
    cy.get('input[type="email"]').clear().should('have.value', '')
    cy.get('input[type="number"]').clear().should('have.value', '')
    cy.get('textarea[id="open-text-area"]').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => { // Custom command com argumento
    cy.fillMandatoryFieldsAndSubmit(user)
  })

  it('envia o formuário com sucesso usando um comando customizado sem argumentos', () => { // Custom command sem argumento
    cy.fillMandatoryFieldsAndSubmitWithoutArgument()
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.fillMandatoryFieldsAndSubmitWithoutMandatoryTelephone()
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json")
      .then(input => {
        console.log(input);
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile("cypress/fixtures/example.json", { action: 'drag-drop' })
      .then(input => {
        console.log(input);
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('jsonFile')
    cy.get('input[type="file"')
      .selectFile('@jsonFile')
      .then(input => {
        console.log(input);
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})
