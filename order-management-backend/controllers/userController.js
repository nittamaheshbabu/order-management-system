const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  console.log("frontend is requesting");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || (password != user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log("account details are correct");
  res.json({ token });
};
