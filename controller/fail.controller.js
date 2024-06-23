const FailModel = require('../model/fail.model')
class FailController
{
    static async readCantFailController(cedula){
        return await FailModel.readCantFailModel(cedula)
    }
    static async readTypeFailController(){
        return await FailModel.readTypeFailModel()
    }

    static async readFailAllController(){
        return await FailModel.readFailAllModel()
    }

    static async readFailAllClientController(cedula){
        return await FailModel.readFailAllClientModel(cedula)
    }

    static async insertFailClientController(cedula,tarea,notas){
        return await FailModel.insertFailClientModel(cedula,tarea,notas)
    }

    static async deleteFailClientController(id_fail)
    {
        return await FailModel.deleteFailClientModel(id_fail)
    }

    static async updateEstadoFailController(estado,nota,evidencia_url,url_firma,id,fcm){
        return await FailModel.updateEstadoFailModel(estado,nota,evidencia_url,url_firma,id,fcm)
    }
}

module.exports = FailController