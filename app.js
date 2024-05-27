require('./config/port')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const user = require("./view/user")
const install = require("./view/install")
const client = require("./view/client")
const transfers = require("./view/transfers")
const fail = require("./view/fail")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(user)
app.use(install)
app.use(client)
app.use(transfers)
app.use(fail)

app.listen(process.env.PORT,()=>{
    console.log(`SERVER API ${process.env.PORT}`)
})