const TransfersModel = require('../model/transfers.model')
class TransfersController
{
    static async readTransfersPenAllController(){
        return await TransfersModel.readTransfersPenAllModel()
    }

    static async readTransfersPenClientAllController(cedula){
        return await TransfersModel.readTransfersPenClientAllModel(cedula)
    }
    static async insertTransfersClientController(cedula, dir, cel, ref,notas,lat_traspaso, lng_traspaso)
    {
        return await TransfersModel.insertTransfersClientModel(cedula, dir, cel, ref,notas,lat_traspaso, lng_traspaso)
    }

    static async deleteTransfersController(id){
        return await TransfersModel.deleteTransfersModel(id)
    }

    static async updateTransfersController(cel,dir,ref,lat_traspaso,lng_traspaso, id_traspaso)
    {
        return await TransfersModel.updateTransfersModel(cel,dir,ref,lat_traspaso,lng_traspaso, id_traspaso)
    }

    static async updateEstadoTransfersController(estado,anotaciones ,img_evidencia ,img_firma,id_traspaso){
        return await TransfersModel.updateEstadoTransfersModel(estado,anotaciones ,img_evidencia ,img_firma,id_traspaso)
    }
}

module.exports = TransfersController