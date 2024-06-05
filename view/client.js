const express = require("express")
const app = express()

const {CheckToken} =require("../util/CheckToken")
const ClientController = require("../controller/client.controller")
const {createToken} = require("../util/createToken");
app.post("/login_client",async function(req,res)
{


    try {
        var data = await ClientController.loginClientController(req.body.user,req.body.pass)
        res.status(200).json({
            status_code : data == null ? 300 : 200,
            datos: data == null ? null : {nombre:data.nombre,avatar:data.avatar,firstLogin:data.firstLogin},
            token: data == null ? null : createToken(data.cedula,data.cedula),
            msm: data == null ? "CLIENTE NO ENCONTRADO" : "LOGIN "
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: null,
            token: null,
            msm: e.toString()
        })
    }


})
app.get("/profile_client",CheckToken,async function(req,res)
{
    try {
        var data = await ClientController.readProfileClientController(req.body.id,req.body.cedula)
        res.status(200).json({
            status_code : data == null ? 300 : 200,
            datos : data == null ? null : data,
            msm : data == null ? "PERFIL ENCONTRADO" : "SIN PERFIL"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos : null,
            msm : e.toString()
        })
    }
})

module.exports = app