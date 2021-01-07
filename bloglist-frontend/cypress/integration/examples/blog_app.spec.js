describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'User One',
      username: 'user1',
      password: 'pswd'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('pswd')
      cy.get('#login-button').click()

      cy.contains('User One logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'User One logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user1', password: 'pswd' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog1')
      cy.get('#author').type('Author1')
      cy.get('#url').type('url1.com')
      cy.get('#create-button').click()

      cy.get('.success')
        .should('contain', 'A new blog Blog1 by Author1 added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Blog1')
      cy.contains('Author1')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Blog1', author: 'Author1', url: 'url1.com' })
        cy.createBlog({ title: 'Blog2', author: 'Author2', url: 'url2.com' })
        cy.createBlog({ title: 'Blog3', author: 'Author3', url: 'url3.com' })
      })

      it('one of those can be liked', function () {
        cy.contains('Blog1')
          .parent()
          .contains('view')
          .click()

        cy.contains('Blog1')
          .parent()
          .parent()
          .contains('like')
          .click()

        cy.contains('Blog1').get('.likes').should('contain', '1')
      })

      it('one of those can be removed', function () {
        cy.contains('Blog1')
          .parent()
          .contains('view')
          .click()

        cy.contains('Blog1')
          .parent()
          .parent()
          .contains('remove')
          .click()

        cy.should('not.contain', 'Blog1')
      })

      it('they are ordered by likes', function () {
        cy.contains('Blog1').parent().contains('view').click()
        cy.contains('Blog2').parent().contains('view').click()
        cy.contains('Blog3').parent().contains('view').click()

        cy.contains('Blog2').parent().parent().contains('like').click()
        cy.contains('Blog3').parent().parent().contains('like').click()
        cy.contains('Blog2').parent().parent().contains('like').click()

        cy.get('.blog').find('.title').then(titles => {
          const titlesText = titles.toArray().map(t => t.textContent)
          expect(titlesText).to.deep.equal(['Blog2', 'Blog3', 'Blog1'])
        })
      })
    })
  })
})