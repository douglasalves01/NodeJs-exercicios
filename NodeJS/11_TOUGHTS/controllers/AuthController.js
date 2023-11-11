const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  static async loginPost(req, res) {
    const { email, password } = req.body;

    //find user
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash("message", "Usuário não encontrado!");
      res.render("auth/login");

      return;
    }
    //check if passwords match
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash("message", "Senha Inválida!");
      res.render("auth/login");
    }
    //iniciando sessão
    req.session.userid = user.id;
    req.flash("message", "Autenticação realizada com sucesso!");
    req.session.save(() => {
      res.redirect("/");
    });
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;
    //validação de senha
    if (password != confirmpassword) {
      req.flash("message", "As senhas não conferem, tente novamente!");
      res.render("auth/register");
      return;
    }
    //check if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } }); //verificando se existe usuario ja cadastrado com esse email
    if (checkIfUserExists) {
      req.flash("message", "O email já está em uso");
      res.render("auth/register");
      return;
    }
    //create a password
    const salt = bcrypt.genSaltSync(10); //dificultando a criação da senha/hash 10 caracteres randomicos
    const hashePassword = bcrypt.hashSync(password, salt);
    const user = {
      //pbjeto usuario
      name,
      email,
      password: hashePassword,
    };
    try {
      const createdUser = await User.create(user);
      //inicializar a sessao
      req.session.userid = createdUser.id;
      req.flash("message", "Cadastro realizado com sucesso!");
      req.session.save(() => {
        //garantindo que a sessao seja salva
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
};
