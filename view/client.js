const express = require("express")
const app = express()

const {CheckToken} =require("../util/CheckToken")
const ClientController = require("../controller/client.controller")
const {createToken} = require("../util/createToken");
app.post("/login_client",async function(req,res)
{


    try {
        var data = await ClientController.loginClientController(req.body.user,req.body.pass,req.body.fcm)
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

app.put("/update_pass",CheckToken,async function(req,res)
{
    try {
        var data = await ClientController.updatePasswordController(req.body.cedula,req.body.pass)

        res.status(200).json({
            status_code : data == null ? 300 : 200,
            msm: data != null ? "COONTRASEÑA ACTUALIZADO" : "ERROR NO SE HAS PODIDO ACTUALIZAR LA CONTRASEÑA"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm: e.toString()
        })
    }
})


app.put("/update_profile_client",CheckToken,async function(req,res)
{
    try {
        var data = await ClientController.updateProfileModel(req.body.nombre,
            req.body.correo,req.body.telefono,req.body.referencia,
            req.body.latitude,req.body.longitude,req.body.cedula)

        res.status(200).json({
            status_code : data == null ? 300 : 200,
            msm: data != null ? "PERFIL ACTUALIZADO" : "ERROR NO SE HAS PODIDO ACTUALIZAR EL PERFIL"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm: e.toString()
        })
    }
})

module.exports = app