import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

// GET /api/users  (admin)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 })
  res.json({ users: users.map((u) => u.toSafeObject()) })
})

// PATCH /api/users/:id  (admin — update role/active status)
export const updateUser = asyncHandler(async (req, res) => {
  const { role, isActive, name, phone } = req.body
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  if (role) user.role = role
  if (typeof isActive === 'boolean') user.isActive = isActive
  if (name) user.name = name
  if (phone) user.phone = phone
  await user.save()
  res.json({ user: user.toSafeObject() })
})

// DELETE /api/users/:id  (admin)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  res.json({ message: 'User deleted' })
})
