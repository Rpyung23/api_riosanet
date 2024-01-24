const FailModel = require('../model/fail.model')
class FailController
{
    static async readTypeFailController(){
        return await FailModel.readTypeFailModel()
    }

    static async readFailAllController(){
        return await FailModel.readFailAllModel()
    }

    static async readFailAllClientController(cedula){
        return await FailModel.readFailAllClientModel(cedula)
    }
}

module.exports = FailController