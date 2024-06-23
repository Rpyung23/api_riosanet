const ClientModel = require("../model/client.model")
class ClientController
{
    static async readProfileClientController(id,cedula)
    {
        return await ClientModel.readProfileClientModel(id,cedula)
    }

    static async loginClientController(user,pass,fcm)
    {
        return await ClientModel.loginClientModel(user,pass,fcm)
    }

    static  async updatePasswordController(cedula, pass){
        return await ClientModel.updatePasswordModel(cedula,pass)
    }

    static async updateProfileModel(nombre,correo,telefono,referencia,latitude,longitude,cedula){
        return await ClientModel.updateProfileModel(nombre,correo,telefono,referencia,latitude,longitude,cedula)
    }
}

module.exports = ClientController