const express = require('express');

const { authentification } = require("../middleware/auth.js");

const AuthRoutes = express.Router();

AuthRoutes.post("/login", authentification);


module.exports = AuthRoutes;
