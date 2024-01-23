const ClientModel = require("../model/client.model")
class ClientController
{
    static async readProfileClientController(id,cedula)
    {
        return await ClientModel.readProfileClientModel(id,cedula)
    }

    static async loginClientController(user,pass)
    {
        return await ClientModel.loginClientModel(user,pass)
    }
}

module.exports = ClientController