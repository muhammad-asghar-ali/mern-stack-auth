require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// mongoose.connect(process.env.MONGODB)
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log("connected to db & app is runnig on port 4001")
//         })
//     })
//     .catch((err) => {
//         console.log(err)
//     })

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, }, () => {
    console.log("Connected to Database")
});

app.listen(process.env.PORT, () => {
    console.log("app is runnig on port "+ process.env.PORT)
})
