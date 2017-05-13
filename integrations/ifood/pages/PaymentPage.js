module.exports = {
  options: {
    valeRefeicao: $('a[title="Vale Refeição"]'),
    sodexo: $('img[title*="SODEXO"]')
  },
  buttons: {
    login: $('input[type="submit"][value="Entrar"]'),
    proceedToPayment: $('.btn[title*="pagamento"]'),
    sendOrder: $('li[style*="opacity: 1"] a.btn.finishPayment[title="Enviar Pedido"]')
  },
  fields: {
    email: $('#email_login'),
    password: $('#password_login')
  },
  profilePicture: $('img[title="Foto Perfil"]')
};
