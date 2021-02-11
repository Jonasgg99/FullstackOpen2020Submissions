describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testname',
      username: 'testusername',
      password: 'testpassword'
    }
    const seconduser = {
      name: 'secondname',
      username: 'secondusername',
      password: 'secondpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.request('POST', 'http://localhost:3001/api/users/', seconduser) 

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    
    it('User with correct credentials can log in', function() {
      cy.get('#username').type('testusername')
      cy.get('#password').type('testpassword')
      cy.get('#loginButton').click()

      cy.contains('testusername is logged in')
    })
    it('Fails with wrong credentials', function() {
      cy.get('#username').type('nonexistent')
      cy.get('#password').type('none')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testusername', password: 'testpassword' })
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('new blog title')
      cy.get('#author').type('new blog author')
      cy.get('#url').type('new blog url')
      cy.contains('Submit').click()
      cy.contains('new blog title')
      cy.contains('new blog author')
      cy.contains('new blog url').should('be.hidden')
    })

    describe('When a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title:'new blog title',
          author:'new blog author',
          url:'new blog url'
        })
      })

      it('Like button works', function() {
        cy.contains('show').click()
        cy.get('#likes').should('contain', '0')
        cy.contains('like').click()
        
        cy.get('#likes').should('contain', '1')
      })

      it('User who created blog can delete it', function() {
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('#bloglist').should('be.empty')
      })

      it('other users can not remove the post', function() {
        cy.contains('log out').click()
        cy.get('#username').type('secondusername')
        cy.get('#password').type('secondpassword')
        cy.get('#loginButton').click()

        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('#bloglist').should('contain', 'new blog title')
      })
    })

    describe('when three blogs exist', function() {

      it('blogs are sorted by highest likes first', function() {
        cy.createBlog({
          title:'twolikes',
          author:'new blog author',
          url:'new blog url',
          likes: 2
        })
        cy.createBlog({
          title:'threelikes',
          author:'new blog author',
          url:'new blog url',
          likes: 3
        })
        cy.createBlog({
          title:'onelike',
          author:'new blog author',
          url:'new blog url',
          likes: 1
        })
        cy.get('.showDetailsButton').click({ multiple: true })
        cy.get('.blog').get('#likes').should('contain', '3')
        cy.contains('remove').click()
        cy.get('.blog').get('#likes').should('contain', '2')
        cy.contains('remove').click()
        cy.get('.blog').get('#likes').should('contain', '1')
      })
    })
  })
})