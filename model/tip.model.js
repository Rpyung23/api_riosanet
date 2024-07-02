const connDB = require('../config/conn')
class TipModel {
    static  async readTipModel(){
        try {
            var sql = "select T.id_tip,T.url_tipo from tips as T"
            var conn = await connDB().promise()
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            return  []
        }
    }
}

module.exports = TipModel