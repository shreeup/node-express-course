const CustomAPIError = require("../errors/custom-error");

const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    throw new BadRequest("Please provide name / password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here is your authorized data. Your lucky number ${luckyNumber}`,
    });
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized");
  }
};

module.exports = {
  login,
  dashboard,
};
