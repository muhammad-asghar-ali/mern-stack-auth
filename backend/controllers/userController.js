const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SC_KEY, { expiresIn: '3d' })
}


module.exports.signUp = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // let emptyFields = []

        // if (!email) {
        //     emptyFields.push('email')
        // }
        // if (!password) {
        //     emptyFields.push('password')
        // }
        // if (emptyFields.length > 0) {
        //     return res.status(400).json({ message: 'Please fill in all fields', emptyFields })
        // }

        const user = await UserModel.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}