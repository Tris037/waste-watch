import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  if (!user.isActive) {
    res.status(403)
    throw new Error('This account has been deactivated')
  }

  res.json({
    token: generateToken(user._id, user.role),
    user: user.toSafeObject(),
  })
})

// POST /api/auth/register  (admin only — creates collector/admin accounts)
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Name, email, and password are required')
  }

  const exists = await User.findOne({ email })
  if (exists) {
    res.status(400)
    throw new Error('A user with this email already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: ['citizen', 'collector', 'admin'].includes(role) ? role : 'collector',
  })

  res.status(201).json({ user: user.toSafeObject() })
})

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeObject() })
})
