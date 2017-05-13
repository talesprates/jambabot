module.exports = {
  url: 'https://www.ifood.com.br/entrar',
  buttons: {
    addMini: $('a.ico-comments.popup-link[title="Adicione MARMITEX MINI ao carrinho"]'),
    addMinimini: $('a.ico-comments.popup-link[title="Adicione MARMITEX MINI MINI ao carrinho"]'),
    addTodasassaladas: $('a.ico-comments.popup-link[title="Adicione TODAS AS SALADAS ao carrinho"]'),
    addExecutiva: $('a.ico-comments.popup-link[title="Adicione MARMITEX EXECUTIVA ao carrinho"]'),
    addDish: $('div.popup-obs a.btn.addObs[title="Adicionar"]'),
    nextTab: $('div.tabPane[style*="block"] .btn.btn_next')
  },
  fields: {
    tab0: 'ul.ls-0.options-list span.tx-0.text-wrap strong.description',
    tab1: 'ul.ls-1.options-list span.tx-1.text-wrap strong.description',
    tab2: 'ul.ls-2.options-list span.tx-2.text-wrap strong.description',
    tab3: 'ul.ls-3.options-list span.tx-3.text-wrap strong.description'
  }
};
