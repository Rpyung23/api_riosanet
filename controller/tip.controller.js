const TipModel = require('../model/tip.model')
class TipController {
    static  async readTipController(){
        return await TipModel.readTipModel()
    }
}

module.exports = TipController