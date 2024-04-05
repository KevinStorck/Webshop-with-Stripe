const fs = require("fs").promises;

const fetchUsers = async () => {
  const users = JSON.parse(await fs.readFile("./database/users.json"));
  return users;
};

module.exports = fetchUsers;
