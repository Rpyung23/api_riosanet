const express = require("express")
const app = express()
const FailController = require("../controller/fail.controller")
const {CheckToken} =require("../util/CheckToken")
app.get("/type_fail",async function(req,res)
{
    try {
        var data = await FailController.readTypeFailController()

        res.status(200).json({
            status_code : data.length > 0 ? 200 : 300,
            datos: data,
            msm : data.length > 0 ? "TIPO DE FALLOS ENCONTRADAS" : "NO EXISTEN TIPOS DE FALLOS DISPONIBLES"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

app.get("/fail_all_pen",CheckToken,async function(req,res)
{
    try {
        var data = await FailController.readFailAllController()

        res.status(200).json({
            status_code : data.length > 0 ? 200 : 300,
            datos: data,
            msm : data.length > 0 ? "TIPO DE FALLOS ENCONTRADAS" : "NO EXISTEN TIPOS DE FALLOS DISPONIBLES"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

module.exports = app