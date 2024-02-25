const express = require('express')
const app = express()
const TransfersController = require('../controller/transfers.controller')
const {CheckToken} =require("../util/CheckToken")
app.get("/transfers_pen_all",async function(req,res)
{

    try {
        var data = await TransfersController.readTransfersPenAllController()

        res.status(200).json({
            status_code : data.length > 0 ? 200 : 300,
            datos: data,
            msm : data.length > 0 ? "CAMBIOS DE DOMICILIO ENCONTRADOS" : "NO EXISTEN CAMBIOS DE DOMICILIOS DISPONIBLES"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

app.get("/transfers_all_client",CheckToken,async function(req,res)
{

    try {
        var data = await TransfersController.readTransfersPenClientAllController(req.body.cedula)

        res.status(200).json({
            status_code : data.length > 0 ? 200 : 300,
            datos: data,
            msm : data.length > 0 ? "CAMBIOS DE DOMICILIO ENCONTRADOS" : "NO EXISTEN CAMBIOS DE DOMICILIOS DISPONIBLES"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

app.post("/create_transfers",CheckToken,async function(req,res)
{
    try {
        //console.log(req.body)
        var data = await TransfersController.insertTransfersClientController(req.body.cedula,
            req.body.dir, req.body.cel, req.body.ref,req.body.notas,req.body.lat_traspaso, req.body.lng_traspaso)

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

app.delete("/delete_transfers",CheckToken,async function(req,res)
{
    try {
        var data = await TransfersController.deleteTransfersController(req.body.id_transfer)

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

app.put("/update_transfers",CheckToken,async function(req,res)
{
    try {
        var data = await TransfersController.updateTransfersController(req.body.cel,
            req.body.dir,req.body.ref,req.body.lat_traspaso,req.body.lng_traspaso,
            req.body.id_traspaso)

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



app.put("/update_estado_transfers",CheckToken,async function(req,res)
{
    console.log(req.body)
    try {
        var data = await TransfersController.updateEstadoTransfersController(req.body.estado,req.body.id)

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