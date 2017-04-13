module.exports = {
  options: {
    valeRefeicao: $('a[title="Vale Refeição"]'),
    sodexo: $('img[title*="SODEXO"]')
  },
  buttons: {
    login: $('input[type="submit"][value="Entrar"]'),
    proceedToPayment: $('.btn[title*="pagamento"]')
  },
  fields: {
    email: $('#email_login'),
    password: $('#password_login')
  },
  profilePicture: $('img[title="Foto Perfil"]')
};
