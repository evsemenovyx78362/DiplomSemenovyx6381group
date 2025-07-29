const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
  }

  
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Неверные данные пользователя' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  
  const user = await User.findOne({ email });

  
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Неверный email или пароль' });
  }
};


const getMe = async (req, res) => {
 
  res.status(200).json(req.user);
};



module.exports = {
  registerUser,
  loginUser,
  getMe,
};