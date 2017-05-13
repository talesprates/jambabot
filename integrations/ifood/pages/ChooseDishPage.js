const order = browser.params.order || {};
let dishSize;

if (order.size === 'minimini') {
  dishSize = 'MARMITEX MINI MINI';
} else if (order.size === 'mini') {
  dishSize = 'MARMITEX MINI';
} else if (order.size === 'todasassaladas') {
  dishSize = 'TODAS AS SALADAS';
}

module.exports = {
  url: 'https://www.ifood.com.br/delivery/campinas-sp/jambalaya-refeicoes-jardim-flamboyant',
  garnishTab: $('div#garnish'),
  buttons: {
    nextButton: $('div.tabPane[style*="block"] .btn.btn_next'),
    submitComment: $('div.popup-obs a.btn.addObs[title="Adicionar"]')
  },
  fields: {
    commentArea: $('div.popup-shell.popup-obs textarea#obs'),
    assertionSelector: $(`div[title*="${dishSize}"]`)
  },
  dish: {
    comentario: order.comment,
    tamanho: $(`a.ico-comments.popup-link[title="Adicione ${dishSize} ao carrinho"]`),
    prato: element(By.cssContainingText('div.tabPane[style*="block"] strong.description', order.dish)),
    guarnicao: element(By.cssContainingText('div.tabPane[style*="block"]  strong.description', order.garnish)),
    salada: element(By.cssContainingText('div.tabPane[style*="block"] strong.description', order.salad))
  }
};
