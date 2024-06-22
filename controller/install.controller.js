const InstallModel = require('../model/install.model')
class InstallController
{
    static async readInstallPenTecController()
    {
        return await InstallModel.readInstallPenAllModel()
    }

    static async updateEstadoInstallController(estado,url_img,notas,id){
        return await InstallModel.updateEstadoInstallModel(estado,url_img,notas,id)
    }
}

module.exports = InstallController