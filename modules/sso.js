// AUTH
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = [];

// Registration path
const ssoRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in memory
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'Successfully registered user' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login path
const ssoLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in memory
    const user = users.find((user) => user.username === username);

    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign({ username }, 'access_token', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  ssoRegister,
  ssoLogin
};
