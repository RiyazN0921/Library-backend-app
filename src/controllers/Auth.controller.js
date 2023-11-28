// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const errorHandler = require('../utils/errorHandler.utils');

exports.signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      username,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(payload, process.env.jwt_secreteKey, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token , payload });
    });
  } catch (error) {
    console.error(error.message);
    errorHandler.handleError(res, 500, 'Internal Server Error');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(payload, process.env.jwt_secreteKey, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });
  } catch (error) {
    console.error(error.message);
    errorHandler.handleError(res, 500, 'Internal Server Error');
  }
};


