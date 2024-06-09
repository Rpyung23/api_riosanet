const connDB = require('../config/conn')
class UserModel
{
    static async loginUserModel(user,pass)
    {
        try {
            var conn = (await connDB()).promise();
            // and U.tipo = 'user'
            var sql = "select U.id,concat('https://riosanetcontrol.com/admin/images/avatar/',U.avatar) avatar," +
                "U.nombre,U.firstLogin,U.user from users as U where " +
                "upper(U.estado) = upper('Habilitado')  " +
                "and U.user = '"+user+"' and U.password = SHA2('"+pass+"',256)"
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
            var sql = "update users set firstLogin = 0,password = sha2('"+pass+"',256) where user = '"+cedula+"'"
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e.toString())
            return null
        }
    }

}

module.exports = UserModel