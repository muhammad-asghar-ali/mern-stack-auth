const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

userSchema.statics.signup = async function (email, password){
    if(!email || !password) {
        throw Error('All field must b filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exist = await this.findOne({email})

    if(exist) {
        throw Error('Emal already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

userSchema.statics.login = async function (email, password){
    if(!email || !password) {
        throw Error('All field must b filled')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error("incorrect password")
    }
    return user
}

module.exports = mongoose.model('User', userSchema)