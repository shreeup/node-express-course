const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
require("dotenv").config();

const logon = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new UnauthenticatedError("Unauthorized");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
  res.status(200).json({ token });
};

const hello = async (req, res) => {
  console.log(req.user);
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      messsage: `Hello, ${req.user.name}`,
    });
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized");
  }
};

module.exports = {
  logon,
  hello,
};
