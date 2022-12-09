const express = require("express");
const UserService = require("../controllers/user.controllers");
const router = express.Router();
const userService = new UserService();

router.get("/getUsers", userService.getUsers);
router.post("/getUserById", userService.getUserById);
router.get("/getProfesionalUsers", userService.getProfesionalUsers);
router.post("/newUser", userService.newUser);
router.put("/modifyUser", userService.modifyUser);
router.delete("/deleteUser", userService.deleteUser);

module.exports = router;
