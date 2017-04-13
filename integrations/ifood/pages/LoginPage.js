module.exports = {
  url: 'https://www.ifood.com.br/entrar',
  buttons: {
    login: $('input[type="submit"][value="Entrar"]')
  },
  fields: {
    email: $('#email_login'),
    password: $('#password_login')
  },
  profilePicture: $('img[title="Foto Perfil"]')
};
