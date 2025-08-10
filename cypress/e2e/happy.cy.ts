describe('happy path', () => {
  it('logs and visits blank page', () => {
    cy.visit('about:blank');
    cy.log('happy path');
  });
});
