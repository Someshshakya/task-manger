const UsersCollection = require("../models/users")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        // Check if user already exists
        const userExists = await UsersCollection.findOne({ email },{email:1});
        if (userExists) {
          return res.status(400).json({ message: 'User already exists with this email.' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user object
        const newUser = {
          name,
          email,
          password: hashedPassword,
          role: 'user', 
          createdAt: new Date()
        };
    
        // Save to DB
        await UsersCollection.insertOne(newUser);
    
        res.status(201).json({ message: 'User registered successfully.' });
      } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ message: 'Internal Server Error ' });
      }
}



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await UsersCollection.findOne({ email },{})
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const payload = {
          id: user._id,
          email: user.email,
          role: user.role
        };
    
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_INHRS });
    
        res.status(200).json({
          message: 'Login successful',
          token,
        });
      } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = {
    registerUser,
    loginUser
}