const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config(); // Chargez les variables d'environnement à partir de .env

const User = require('../models/User.js');

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

async function authentification(req, res) {
  console.log(req.body);
  console.log(req.query);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user && user.activated === 0) {
      return res
        .status(404)
        .json({ message: "Votre compte n'est pas encore activé" });
    }

    if (user && user.activated === 1) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(
          { user: user, role: user.role },
          SECRET_KEY,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );

        res.header("Authorization", "Bearer " + token);

        return res
          .status(200)
          .json({ user: user, token: token, message: "Vous êtes bien connecté" });
      } else {
        return res
          .status(403)
          .json({ message: "Email ou mot de passe incorrect" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    console.error("Erreur lors de l'authentification:", error);
    return res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'authentification" });
  }
}

async function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Accès refusé.");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Accès refusé." });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Accès refusé." });
  }
}

function checkRolesToken(roles) {
  return (req, res, next) => {
    console.log("checkRolesToken: ", req.user);
    const userRole = req.user && req.user.role;

    const hasRole = roles.some((role) => userRole.includes(role));
    if (userRole && hasRole) {
      next();
    } else {
      return res.status(403).json({ error: "Pas les permissions requises." });
    }
  };
}


module.exports = { authentification, verifyToken, checkRolesToken };