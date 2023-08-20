const express = require("express");
const { check } = require("express-validator");

const { getUsers, signup, login } = require("../controller/users-controller");

const router = express.Router();

router.get("/", getUsers);
router.post(
  "/signup",
  [check("name").notEmpty(), check("email").normalizeEmail().isEmail()],
  signup
);
router.post("/login", login);

module.exports = router;
