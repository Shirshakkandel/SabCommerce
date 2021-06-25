import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { compare, genSalt, hash } = bcrypt
const { model, Schema } = mongoose

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    number: { type: String, required: true },
    accountType: { type: String, required: true },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

const User = model('User', userSchema)
export default User
