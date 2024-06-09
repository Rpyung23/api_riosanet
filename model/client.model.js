const connDB = require('../config/conn')
class ClientModel
{
    static async readProfileClientModel(id,cedula)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select C.nombre,C.correo,C.telefono movil,C.latitude,C.longitude," +
                "C.direccion,'' avatar from contratos as C " +
                "where C.cedula = '"+cedula+"'"
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0][0]
        }catch (e) {
            console.log(e)
            return null
        }
    }

    static async loginClientModel(user,pass)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select C.nombre,'' avatar,C.cedula,C.firstLogin,C.correo from contratos as C " +
                "where C.cedula = '"+user+"' and C.passw = SHA2('"+pass+"',256) and trim(estado) = 'registrado'"
            /*var sql = "select U.nombre,U.avatar,U.cedula,U.correo from usuarios as U where U.cedula = '"+user+"' " +
                             "and U.pass = SHA2('"+pass+"',256) and estado = 1"*/
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0][0]
        }catch (e) {
            console.log(e)
            return null
        }
    }

    static  async updatePasswordModel(cedula, pass)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update contratos set firstLogin = 0,passw = sha2('"+pass+"',256) where cedula = '"+cedula+"'"
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e.toString())
            return null
        }
    }

    static async updateProfileModel(nombre,correo,telefono,referencia,latitude,longitude,cedula)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update contratos set nombre = '"+nombre+"',correo = '"+correo+"'," +
                "telefono = '"+telefono+"',referencia = '"+referencia+"'," +
                "latitude = "+latitude+",longitude = "+longitude+" where  cedula = '"+cedula+"'"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e.toString())
            return false
        }
    }
}


module.exports = ClientModel