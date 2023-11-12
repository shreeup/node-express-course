const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new UnauthenticatedError("Unauthorized");

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name } = decoded;
    req.user = { name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized");
  }
};

module.exports = authenticationMiddleware;
