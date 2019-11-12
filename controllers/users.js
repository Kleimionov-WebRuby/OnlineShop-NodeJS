const User = require('../db/models').User;
const Role = require('../db/models').Role;

const hashPassword = require('../core/hashPassword');

module.exports = {
  async create(req, res) {
    try {
      if (!req.body) return res.status(400).send('Fill all fields');

      const userFullName = req.body.fullname;
      const userEmail = req.body.email;
      const userPassword = req.body.password;

      if (!userFullName || !userEmail || !userPassword) {
        return res.status(400).send({ message: 'Check your fields. Maybe some of them are empty' });
      }

      const oldUser = await User.findOne({ where: { email: userEmail } });

      if (oldUser !== null) {
        return res.status(400).send({ message: 'User with this Email already exists' });
      }

      const userCollection = {
        fullname: userFullName,
        email: userEmail,
      };

      const role = await Role.findOne({ where: { role: 'user' } });
      userCollection.RoleId = role.id;

      await hashPassword(userPassword).then(hashedPassword => {
        userCollection.password = hashedPassword;
      });

      const user = await User.create(userCollection);

      res.status(201).send(user);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  async getAllUsers(req, res) {
    try {
      const userCollection = await User.findAll();

      res.status(201).send(userCollection);
    } catch (error) {
      console.log(error);

      res.status(500).send(error);
    }
  },
};
