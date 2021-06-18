import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const { model, Schema } = mongoose

const userSchema = Schema({
     userName: { type: String, required: true },
     email: { type: String, required: true },
     password: { type: String, required: true },
     isAdmin: { type: Boolean, required: true, default: false },
     number: { type: String, required: true },
     accountType:{type:String,required:true},
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save', async function (next) {
     if (!this.isModified('password')) {
          next()
     }
     const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)
})

const User = model('User', userSchema)
export default User