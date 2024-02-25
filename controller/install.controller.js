const InstallModel = require('../model/install.model')
class InstallController
{
    static async readInstallPenTecController()
    {
        return await InstallModel.readInstallPenAllModel()
    }

    static async updateEstadoInstallController(estado,id){
        return await InstallModel.updateEstadoInstallModel(estado,id)
    }
}

module.exports = InstallController