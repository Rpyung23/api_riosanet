require('./config/port')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.listen(process.env.PORT,()=>{
    console.log(`SERVER API ${process.env.PORT}`)
})