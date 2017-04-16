const order = browser.params.order;

module.exports = {
  url: 'https://www.ifood.com.br/delivery/campinas-sp/jambalaya-refeicoes-jardim-flamboyant',
  garnishTab: $('div#garnish'),
  buttons: {
    nextButton: $('div.tabPane[style*="block"] .btn.btn_next'),
    submitComment: $('div.popup-obs a.btn.addObs[title="Adicionar"]')
  },
  fields: {
    commentArea: $('div.popup-shell.popup-obs textarea#obs'),
    assertionSelector: $(`div[title*="${order.size}"]`)
  },
  dish: {
    comentario: order.comment,
    tamanho: $(`a.ico-comments.popup-link[title="Adicione ${order.size} ao carrinho"]`),
    prato: element(By.cssContainingText('div.tabPane[style*="block"] strong.description', order.dish)),
    guarnicao: element(By.cssContainingText('div#cboxLoadedContent strong.description', order.garnish)),
    salada: element(By.cssContainingText('div#cboxLoadedContent strong.description', order.salad))
  }
};
