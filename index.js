const express = require('express')
const sequelize = require('./config/db')
const app = express()
const userSchema = require('./models/authSchema.js')
const userRouter = require('./routes/userRoutes.js')
app.use(express.json())

app.use('/api',userRouter)
sequelize.sync().then(()=> {
    app.listen(8000 , ()=>{
        console.log('Server listening in http://localhost:8000')
    })
})