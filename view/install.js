const express = require("express")
const app = express()

const {CheckToken} =require("../util/CheckToken")
const InstallController = require("../controller/install.controller")

app.get('/install_pen_all',async function(req,res)
{
    try {
        var data = await InstallController.readInstallPenTecController()

        res.status(200).json({
            status_code : data.length > 0 ? 200 : 300,
            datos: data,
            msm : data.length > 0 ? "INSTALACIONES ENCONTRADAS" : "NO EXISTEN INSTALACIONES DISPONIBLES"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})


module.exports = app