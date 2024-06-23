const connDB = require('../config/conn')
class TransfersModel
{
    static async readTransfersPenAllModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select T.anotaciones,T.img_evidencia,T.img_firma," +
                "T.id,T.cedula,C.nombre,T.cel,T.dir,T.ref,T.lat_traspaso,T.estado," +
                "T.lng_traspaso,T.id_tec,UT.nombre nombre_tecnico from traspasos as T " +
                "left join contratos as C on C.cedula = T.cedula left join users as UT on " +
                "UT.id = T.id_tec where T.estado in (1,2) order by T.fecha_hora desc"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readTransfersPenClientAllModel(cedula)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select T.id,T.cedula,C.nombre,T.cel,T.dir,T.ref,T.lat_traspaso,T.estado," +
                "T.lng_traspaso,T.id_tec,UT.nombre nombre_tecnico from traspasos as T " +
                "left join contratos as C on C.cedula = T.cedula left join users as UT on " +
                "UT.id = T.id_tec where T.cedula = '"+cedula+"' order by T.fecha_hora desc"
            /*var sql = "select T.id,T.cedula,U.nombre,T.cel,T.dir,T.ref,T.lat_traspaso," +
                "T.estado,T.lng_traspaso,T.id_tec,UT.nombre nombre_tecnico from traspasos as T " +
                "left join usuarios as U on U.cedula = T.cedula left join users as UT on " +
                "UT.id = T.id_tec where T.cedula = '"+cedula+"' order by T.fecha_hora,T.estado asc"*/
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async insertTransfersClientModel(cedula, dir, cel, ref,notas,lat_traspaso, lng_traspaso)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into traspasos(agencia, name, cedula, dir, estado, ciudad, tarea, " +
                "cel, ref,fecha, fecha_hora, fecha_com, fecha_hora_com, notas, id_tec,lat_traspaso, " +
                "lng_traspaso) VALUES (0,'','"+cedula+"','"+dir+"'," +
                "1,'','TRASPASO','"+cel+"','"+ref+"',date(now()),now(),'000-00-00','000-00-00 00:00:00'," +
                "'"+notas+"',46,"+lat_traspaso+","+lng_traspaso+")"
            await conn.query(sql)
            await conn.end()
            return {code:200,msm:'OK'}
        }catch (e) {
            console.log(e)
            return {code:400,msm:e.toString()}
        }
    }

    static async deleteTransfersModel(id)
    {
        try{
            var conn = await connDB().promise()
            var sql = `delete from traspasos where id = ${id}`
            //console.log(sql)
            await conn.query(sql)
            await conn.end()
            return {code:200,msm:"OK"}
        }catch (e) {
            console.log(e)
            return {code:400,msm:e.toString()}
        }
    }

    static async updateTransfersModel(cel,dir,ref,lat_traspaso,lng_traspaso, id_traspaso)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update traspasos set cel = '"+cel+"',dir = '"+dir+"',ref = '"+ref+"'," +
                "lat_traspaso = "+lat_traspaso+",lng_traspaso = "+lng_traspaso+" where id = "+id_traspaso
            await conn.query(sql)
            await conn.end()
            return {code:200,msm:'OK'}
        }catch (e) {
            return {code:400,msm:e.toString()}
        }
    }

    static async updateEstadoTransfersModel(estado,anotaciones ,img_evidencia ,img_firma,id_traspaso){
        try {
            var conn = await connDB().promise()
            var sql = "update traspasos set estado = "+estado+",anotaciones = '"+anotaciones+"',img_evidencia = '"+img_evidencia+"'," +
                "img_firma = '"+img_firma+"' where id = "+id_traspaso
            //var sql = `update traspasos set estado = ${estado} where id = ${id}`
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return {code :200,msm:"OK"}
        }catch (e) {
            return  {code:400,msm:e.toString()}
        }
    }
}

module.exports = TransfersModel