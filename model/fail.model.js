const connDB = require('../config/conn')
class FailModel
{
    static async readTypeFailModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select LS.id,LS.nombre from lista_fallos as LS"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readFailAllModel()// TECNICO
    {
        try {
            var conn = await connDB().promise()
            var sql = "select F.id,F.cedula,F.tarea,F.notas nota_fallo,F.id_tec," +
                "UT.nombre nombre_tecnico,U.movil,U.nombre,U.direccion,U.lat_usuario," +
                "U.lng_usuario from fallos as F left join users as UT on UT.id = F.id_tec " +
                "left join usuarios as U on U.cedula = F.cedula where F.estado = 1"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readFailAllClientModel(cedula)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select F.id,F.cedula,F.tarea,F.notas nota_fallo," +
                "F.id_tec,UT.nombre nombre_tecnico,U.nombre,U.direccion,U.movil," +
                "U.lat_usuario,U.lng_usuario,F.estado from fallos as F left join users as UT on UT.id = F.id_tec " +
                "left join usuarios as U on U.cedula = F.cedula where F.cedula = '"+cedula+"'"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    /*static async insertFailClientModel(cel,cedula,notas)
    {
        var conn = await connDB().promise()
        var sql = "insert into fallos(agencia, name, dir, estado, ciudad, " +
            "tarea, cel, ref, fecha, id_tec, cedula,fecha_hora, fecha_com," +
            "fecha_hora_com, notas) VALUES (0,'','',1,'GUARANDA','INTERNET INTERMITENTE','',''," +
            "date(now()),46,'',now(),date(now()),now(),'');"
    }*/
}

module.exports = FailModel