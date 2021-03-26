describe('Search Results', function () {
  
  beforeEach(() => {
    cy.visit('/')
  });
  
it('can find a video by teacher name', () => {
    cy.get('[placeholder="Search for Tutorials..."]').clear();
    cy.get('[placeholder="Search for Tutorials..."]').type('katy');
    cy.contains('https://thisurldoesnotactuallyexist.totallynotreal/3fda6df9-97aa-4039-ac22-5978e6c73d5f');
  });

it('can find a video by video Title', () => {
    cy.get('[placeholder="Search for Tutorials..."]').clear();
    cy.get('[placeholder="Search for Tutorials..."]').type('animals');
    cy.contains('https://thisurldoesnotactuallyexist.totallynotreal/2ad09795-95e9-46fd-a5fc-57d9755f115d');
  });

it('can find a video by tag', () => {
    cy.get('[placeholder="Search using Tags..."]').clear();
    cy.get('[placeholder="Search using Tags..."]').type('hard');
    cy.contains('https://thisurldoesnotactuallyexist.totallynotreal/e065b075-4392-4478-bdbb-82c646589ce5');
  });

})