const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(201).json({message: 'Register route'});
})

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    res.status(201).json({message: 'Login route'});
})

// @desc Get current user
// @route GET /api/auth/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Current user route'});
})

module.exports = { registerUser, loginUser, currentUser };