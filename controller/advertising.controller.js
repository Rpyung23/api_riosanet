const AdvertisingModel = require('../model/advertising.model')
class AdvertisingController {
    static  async readAdvertisingController()
    {
        return await AdvertisingModel.readAdvertisingModel()
    }
}

module.exports = AdvertisingController