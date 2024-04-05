const fetchUsers = require("../services/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
require("dotenv").config()
const initStripe = require("../stripe/initStripe")
const stripe = initStripe()

const login = async (req, res) => {
  const users = await fetchUsers();
  const user = users.find(
    (u) => u.email === req.body.nameOrEmail || u.username === req.body.nameOrEmail
  );
  if (!user) return res.status(409).json("User does not exist");
  if (!(await bcrypt.compare(req.body.password, user.password)))
    return res.status(410).json("Your password did not match the user");

  req.session.user = user;
  res.status(200).json({id: user.id, email: user.email, username: user.username});
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json("Logged out");
};

const register = async (req, res) => {
  const { email, username, password } = req.body;
  const users = await fetchUsers();
  const user = users.find((u) => u.username === username || u.email === email);
  if (user && user.username === username) {
    return res.status(409).json("Username is already in use");
  } else if (user && user.email === email) {
    return res.status(409).json("Email is already in use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const response = await stripe.customers.create({name: username, email})

  users.push({id: response.id, email, username, password: hashPass});

  await fs.writeFile("./database/users.json", JSON.stringify(users, null, 2));

  if (!user) res.status(201).json("User Successfully created");
  else res.status(400).json("Something went wrong");
};

const authorize = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json({id: req.session.user.id, email: req.session.user.email, username: req.session.user.username});
};

module.exports = { login, logout, register, authorize };
