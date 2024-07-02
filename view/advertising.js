const express = require('express')
const app = express()
const AdvertisingController = require('../controller/advertising.controller')

app.get('/advertising',async function(req,res)
{
    var data = await AdvertisingController.readAdvertisingController()
    try {
        res.status(200).json({
            status_code:200,
            datos: data
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            datos: []
        })
    }
})

module.exports = app