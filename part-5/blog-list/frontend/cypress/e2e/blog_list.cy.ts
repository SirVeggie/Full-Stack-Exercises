describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/test/reset');
    
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'root',
      name: 'none',
      password: 'sekret',
    });
    
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'root2',
      name: 'none2',
      password: 'sekret2',
    });

    cy.visit('http://localhost:3000');
  });

  it('login form is shown', () => {
    cy.contains('Login');
  });

  describe('login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('root');
      cy.get('#password').type('sekret');
      cy.get('#login-button').click();
      cy.contains('Logged in as root');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.contains('invalid username or password');
    });
    
    it('login custom command works', () => {
      cy.login('root', 'sekret');
      cy.contains('Welcome root');
    });
  });
  
  describe('when logged in', () => {
    beforeEach(() => {
      cy.login('root', 'sekret');
    });
    
    it('a blog can be created', () => {
      cy.contains('Create new').click();
      cy.get('label').contains('Title').type('test blog');
      cy.get('label').contains('Author').type('test author');
      cy.get('label').contains('Url').type('http://test.com');
      cy.get('form button').contains('Create').click();
      cy.contains('test blog');
    });
    
    describe('and a blog exists', () => {
      beforeEach(() => {
        cy.createBlog('test blog', 'test author', 'http://test.com');
        cy.visit('http://localhost:3000');
      });
      
      it('a blog can be liked', () => {
        cy.get('.blog').contains('Show').click();
        cy.get('.blog button').contains('Like').click();
        cy.get('.blog').contains('Likes: 1');
      });
      
      it('a blog can be deleted', () => {
        cy.get('.blog button').contains('Delete').click();
        cy.get('.blog').should('not.exist');
      });
      
      it('a blog cannot be deleted by another user', () => {
        cy.login('root2', 'sekret2');
        cy.get('.blog button').contains('Delete').should('not.exist');
      });
      
      it('blogs are ordered according to likes', () => {
        cy.createBlog('test blog2', 'test author2', 'http://test2.com');
        cy.createBlog('test blog3', 'test author3', 'http://test3.com');
        cy.visit('http://localhost:3000');
        cy.contains('test blog2').closest('.blog').contains('Show').click();
        cy.contains('test blog2').closest('.blog').find('button').contains('Like').click();
        cy.contains('test blog3').closest('.blog').contains('Show').click();
        cy.contains('test blog3').closest('.blog').find('button').contains('Like').click();
        cy.contains('test blog3').closest('.blog').contains('Likes: 1');
        cy.contains('test blog3').closest('.blog').find('button').contains('Like').click();
        cy.get('.blog:first').should('contain', 'test blog3');
      });
    });
  });
});