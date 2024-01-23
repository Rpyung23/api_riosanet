const connDB = require('../config/conn')
class ClientModel
{
    static async readProfileClientModel(id,cedula)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select U.nombre,U.correo,U.movil,U.direccion,U.avatar from usuarios as U " +
                "where U.cedula = '"+cedula+"'"
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
            var sql = "select U.nombre,U.avatar,U.cedula,U.correo from usuarios as U where U.cedula = '"+user+"' " +
                             "and U.pass = SHA2('"+pass+"',256) and estado = 1"
            //console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0][0]
        }catch (e) {
            console.log(e)
            return null
        }
    }
}


module.exports = ClientModel