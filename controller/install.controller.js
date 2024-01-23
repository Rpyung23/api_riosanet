const InstallModel = require('../model/install.model')
class InstallController
{
    static async readInstallPenTecController()
    {
        return await InstallModel.readInstallPenAllModel()
    }
}

module.exports = InstallController