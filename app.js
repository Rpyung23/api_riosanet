require('./config/port')
const express = require('express')
const app = express()

app.listen(process.env.PORT,()=>{
    console.log(`SERVER API ${process.env.PORT}`)
})