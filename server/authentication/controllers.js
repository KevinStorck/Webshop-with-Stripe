const fetchUsers = require("../services/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const users = await fetchUsers();
  const user = users.find(
    (u) => u.email === req.body.nameOrEmail || u.username === req.body.nameOrEmail
  );
  if (!user) return res.status(409).json("User does not exist");
  if (!(await bcrypt.compare(req.body.password, user.password)))
    return res.status(410).json("Your password did not match the user");

  req.session.user = user;
  res.status(200).json({email: user.email, username: user.username});
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json("Logged out");
};

const register = async (req, res) => {
  const { email, username, password } = req.body;
  const users = await fetchUsers();
  const user = users.find((u) => u.username === username || u.email === email);
  console.log(user);
  if (user && user.username === username) {
    return res.status(409).json("Username is already in use");
  } else if (user && user.email === email) {
    return res.status(409).json("Email is already in use");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    username,
    password: hashPass,
  };

  users.push(newUser);
  await fs.writeFile("./database/users.json", JSON.stringify(users, null, 2));

  if (!user) res.status(201).json("User Successfully created");
  else res.status(400).json("Something went wrong");
};

const authorize = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json({email: req.session.user.email, username: req.session.user.username});
};

module.exports = { login, logout, register, authorize };
