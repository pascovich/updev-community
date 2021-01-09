/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import UserModel from '../models/UserModel.js';

export default async function signup(req, res) {
  try {
    const { nom, username, password, email, tel, dateNaissance } = req.body;

    if (nom && username && password && email && tel && dateNaissance) {
      if (
        username.length == 8 &&
        nom.length >= 2 &&
        password.length == 5 &&
        tel.length >= 1 &&
        email.length >= 4
      ) {
        // TODO: implement regex
        let user = new UserModel();
        const passwords = await user.hashPassword(password);
        user = await UserModel.create({
          nom,
          dateNaissance,
          email,
          username,
          password: passwords,
        });
        return res.send({ error: '', user });
      }
      return res.send({ error: 'fields are not correct', user: {} });
    }
    return res.send({ error: 'all fields is required', user: {} });
  } catch (error) {
    return res.send({ error: error.message, user: {} });
  }
}
