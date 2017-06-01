const PaymentPage = require('../../pages/PaymentPage');

describe('Payment Method', () => {
  it('Select the payment method and confirm the order', () => {
    waitElementVisible(PaymentPage.buttons.proceedToPayment).then(e => e.click());

    waitElementVisible(PaymentPage.options.valeRefeicao).then(e => e.click());

    waitElementVisible(PaymentPage.options.sodexo).then(e => e.click());

    if (browser.params.envprod === true) {
      waitElementVisible(PaymentPage.buttons.sendOrder).then(e => e.click());
    }

    process.send('Pedido feito.');

    // TODO tirar print e mandar em private
  });
});
