const connDB = require('../config/conn')
class InstallModel
{
    static async readInstallPenAllModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select I.id,I.name,I.cel,I.dir,I.ciudad,I.tarea,I.ref,I.notas,I.id_tec," +
                "U.nombre as nombre_tecnico from instalaciones as I inner join users as U " +
                "on U.id = I.id_tec where I.estado = 0 order by I.fecha desc"
            //console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }


    static async updateEstadoInstallModel(estado,id){
        try {
            var conn = await connDB().promise()
            var sql = "update instalaciones set estado = "+estado+" where id = "+id
            await conn.query(sql)
            await conn.end()
            return {code :200,msm:"OK"}
        }catch (e) {
            return  {code:400,msm:e.toString()}
        }
    }


}

module.exports = InstallModel