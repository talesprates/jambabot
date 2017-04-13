const PaymentPage = require('../pages/PaymentPage');

describe('Payment Method', () => {
  it('Select the payment method and confirm the order', () => {
    waitElementVisible(PaymentPage.buttons.proceedToPayment).then(e => e.click());

    // const paymentTab = ;

    // const wholeTab = $('div.exp-content.hide[style*="display"]');

    waitElementVisible(PaymentPage.options.valeRefeicao).then(e => e.click());

    waitElementVisible(PaymentPage.options.sodexo).then(e => e.click());

    // waitElementVisible($('a.btn.finishPayment[title="Enviar Pedido"]')).then(e => e.click());

    // wholeTab.element(By.className('finishPayment')).click();
    // ('a.btn.finishPayment[title="Enviar Pedido"]')).click();

    browser.sleep(10000);

    // console.log('\nenvprod: ' + browser.params.envprod);
  });
});
