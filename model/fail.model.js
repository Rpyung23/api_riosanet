const connDB = require('../config/conn')
class FailModel
{
    static async readCantFailModel(cedula){
        try {
            var conn = await connDB().promise()
            var sql = "select count(*) as cantFail from fallos as F where F.estado = 1 and F.cedula = '"+cedula+"'"
            var response = await conn.query(sql)
            await conn.end()

            return response[0][0].cantFail
        }catch (e) {
            console.log(e)
            return  0
        }
    }

    static async readTypeFailModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select LS.id,LS.nombre,LS.level from lista_fallos as LS"
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
            /*var sql = "select F.id,F.cedula,F.tarea,F.notas nota_fallo,F.id_tec," +
                "UT.nombre nombre_tecnico,U.movil,U.nombre,U.direccion,U.lat_usuario," +
                "U.lng_usuario from fallos as F left join users as UT on UT.id = F.id_tec " +
                "left join usuarios as U on U.cedula = F.cedula where F.estado = 1"*/
            var sql = "select LF.level,F.id,F.cedula,F.tarea,F.notas nota_fallo,F.id_tec," +
                "UT.nombre nombre_tecnico,C.telefono movil,C.nombre,C.direccion,C.latitude lat_usuario," +
                "C.longitude lng_usuario from fallos as F left join users as UT on UT.id = F.id_tec " +
                "left join contratos as C on C.cedula = F.cedula left join lista_fallos LF on TRIM(LF.nombre) = TRIM(F.tarea) " +
                "where F.estado = 1 and !ISNULL(LF.level);"
            console.log(sql)
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
            /*var sql = "select F.id,F.cedula,F.tarea,F.notas nota_fallo," +
                "F.id_tec,UT.nombre nombre_tecnico,U.nombre,U.direccion,U.movil," +
                "U.lat_usuario,U.lng_usuario,F.estado from fallos as F left join users as UT on UT.id = F.id_tec " +
                "left join usuarios as U on U.cedula = F.cedula where F.cedula = '"+cedula+"' order by fecha_hora desc"*/

            var sql = "select F.id,F.cedula,F.tarea,F.notas nota_fallo,F.id_tec,UT.nombre nombre_tecnico," +
                "C.nombre,C.direccion,C.telefono movil,C.latitude lat_usuario,C.longitude lng_usuario,F.estado from fallos " +
                "as F left join users as UT on UT.id = F.id_tec left join contratos as C on " +
                "C.cedula = F.cedula where F.cedula = '"+cedula+"' order by fecha_hora desc"
            var data = await conn.query(sql)
            //console.log(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

   static async insertFailClientModel(cedula,tarea,notas)
   {
       try {
           var conn = connDB().promise()
           var sql = "insert into fallos(agencia, name, dir, estado, ciudad, tarea, cel, ref, " +
               "fecha, id_tec, cedula,fecha_hora, fecha_com, fecha_hora_com, notas) VALUES " +
               "(0,'','',1,'GUARANDA','"+tarea+"','','',date(now()),46,'"+cedula+"',now(),'0000-00-00','0000-00-00 00:00:00','"+notas+"')"

           await conn.query(sql)
           await conn.end()
           return {code:200,msm:'FALLO CREADO CON EXITO'}
       }catch (e) {
           return {code:400,msm:e.toString()}
       }
   }


   static async deleteFailClientModel(id_fail)
   {
       try {
           var conn = await connDB().promise()
           await conn.query("delete from fallos where id = "+id_fail)
           await conn.end()
           return {code:200,msm:'FALLO ELIMINADO CON EXITO'}
       }catch (e) {
           return {code:400,msm:e.toString()}
       }
   }

    static async updateEstadoFailModel(estado,id){
        try {
            var conn = await connDB().promise()
            var sql = "update fallos set estado = "+estado+" where id = "+id
            await conn.query(sql)
            await conn.end()
            return {code :200,msm:"OK"}
        }catch (e) {
            return  {code:400,msm:e.toString()}
        }
    }
}

module.exports = FailModel