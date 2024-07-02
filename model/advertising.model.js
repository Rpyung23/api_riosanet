const connDB = require("../config/conn");

class AdvertisingModel {
    static  async readAdvertisingModel(){
        try {
            var sql = "select A.id,A.url_anuncio from anuncios as A"
            var conn = await connDB().promise()
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            return  []
        }
    }
}

module.exports = AdvertisingModel