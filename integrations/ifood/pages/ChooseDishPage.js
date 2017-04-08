module.exports = {
  url: 'https://www.ifood.com.br/delivery/campinas-sp/jambalaya-refeicoes-jardim-flamboyant',
  garnishTab: $('div#garnish'),
  buttons: {
    nextButton: $('div.tabPane[style*="block"] .btn.btn_next'),
    submitComment: $('div.popup-obs a.btn.addObs[title="Adicionar"]')
  },
  fields: {
    commentArea: $('div.popup-shell.popup-obs textarea#obs'),
    assertionSelector: $(`div[title*="${browser.params.dishSize}"]`)
  },
  dish: {
    comentario: browser.params.dishComment,
    tamanho: $(`a.ico-comments.popup-link[title="Adicione ${browser.params.dishSize} ao carrinho"]`),
    prato: element(By.cssContainingText('div.tabPane[style*="block"] strong.description', browser.params.dishOption)),
    guarnicao: element(By.cssContainingText('div#cboxLoadedContent strong.description', browser.params.dishSideDish)),
    salada: element(By.cssContainingText('div#cboxLoadedContent strong.description', 'Saladas diversas'))
  }
};
