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


app.get("/fail_all_client",CheckToken,async function(req,res)
{
    try {
        var data = await FailController.readFailAllClientController(req.body.cedula)

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


app.post("/create_fail",CheckToken,async function(req,res)
{
    try {
        var cant = await FailController.readCantFailController(req.body.cedula)

        if(cant <= 1){
            var data =  await FailController.insertFailClientController(req.body.cedula,
                req.body.tarea,req.body.notas)
        }

        var json = {
            status_code : cant > 0 ? 300 : data.code,
            msm : cant > 0 ? 'Por favor, espere a que un técnico revise su fallo anterior' : data.msm
        }
        //console.log(json)

            res.status(200).json(json)
    }catch (e) {
        console.log(e)
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

app.delete("/delete_fail",CheckToken,async function(req,res)
{
    try {
        var data = await FailController.deleteFailClientController(req.body.id_fail)

        res.status(200).json({
            status_code : data.code,
            msm : data.msm
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})


app.put("/update_estado_fail",CheckToken,async function(req,res)
{
    console.log(req.body)
    try {
        var data = await FailController.updateEstadoFailController(req.body.estado,
            req.body.nota,req.body.evidencia_url,req.body.url_firma,req.body.id_fail,req.body.fcm)

        res.status(200).json({
            status_code : data.code,
            msm:data.msm
        })
    }catch (e) {
        res.status(200).json({
            status_code : data.code,
            msm: e.toString()
        })
    }
})

module.exports = app