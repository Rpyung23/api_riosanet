const express = require('express')
const app = express()
const UserController = require('../controller/user.controller')
const {createToken} = require('../util/createToken')
const {CheckToken} = require("../util/CheckToken");
app.post('/login_user',async function(req,res)
{
    try {
        var data = await UserController.loginUserController(req.body.user,req.body.pass)
        res.status(200).json({
            status_code : data == null ? 300 : 200,
            datos: data == null ? null : {avatar:data.avatar,nombre:data.nombre,firstLogin:data.firstLogin},
            token: data == null ? null : createToken(data.id,data.cedula == undefined ? data.user : data.cedula),
            msm: data == null ? "USUARIO NO ENCONTRADO" : "LOGIN"
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


app.put("/update_pass_user",CheckToken,async function(req,res)
{
    try {
        var data = await UserController.updatePasswordController(req.body.cedula,req.body.pass)

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

module.exports = app