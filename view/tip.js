const express = require('express')
const app = express()
const TipController = require('../controller/tip.controller')

app.get('/tips',async function(req,res)
{
    var data = await TipController.readTipController()
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