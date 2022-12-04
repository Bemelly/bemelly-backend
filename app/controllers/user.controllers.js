const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserService {
  async getUsers(req, res) {
    const result = await User.find();
    res.send(result);
  }

  async getProfesionalUsers(req, res) {
    const result = await User.find({
      $or: [{ role: "professional" }, { role: "admin" }],
    });
    res.send(result);
  }

  async newUser(req, res) {
    try {
      const user = req.body;
      const passwordHash = await bcrypt.hash(user.password, saltRounds);

      if (passwordHash) {
        user.password = passwordHash;
      }
      await User.create(user);
      res.status(200).send("Se ha creado el usuario correctamente");
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async modifyUser(req, res) {
    const user = req.body;
    await User.findOneAndUpdate({ CC: user.CC }, { name: user.name });
    await User.findOneAndUpdate({ CC: user.CC }, { email: user.email });
    await User.findOneAndUpdate({ CC: user.CC }, { role: user.role });
    res.send("el usuario ha sido modificado");
  }

  async deleteUser(req, res) {
    const user = req.body;
    await User.findOneAndDelete({ CC: user.CC });
    res.send("se ha eliminado el usuario correctamente");
  }
}

module.exports = UserService;
