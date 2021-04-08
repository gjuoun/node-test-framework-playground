const bcrypt = require('bcrypt');

function getUser(username) {
  if (username === "correct") {
    return {
      username,
      password: `$2b$10$GXy4aCb6j6TYzNKgSNfekOg5KoI5bkKW4UHDO3.O5AhEQs1fg03nG` //"12345"
    }
  } else if (username === "nonexist") {
    return undefined
  } else {
    return {
      username,
      password: `wrong password` //"12345"
    }
  }

}


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'username and password are required' });
    }
    const user = getUser(username);
    if (!user) {
      return res.status(401).json({ message: 'No user with matching username' });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Wrong password' });
    }
    req.session.data = { username };
    return res.status(201).json();
  } catch (e) {
    console.error(`Error during login of "${req.body.username}": ${e.stack}`);
    res.status(500).json({ message: e.message });
  }
}


module.exports = {
  login
}