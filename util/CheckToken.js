const jwt = require("jsonwebtoken");
const JWT_PASS_SECRET = require("../util/constant")
module.exports = {
    CheckToken(req, res, next) {

        //Recipción de token
        const tokenApi =
            req.body.token ||
            req.query.token ||
            req.headers["x-access-token"] ||
            req.params.token;
        if (tokenApi) {

            jwt.verify(tokenApi, JWT_PASS_SECRET, (err, decoded) => {
                if (!err) {
                    req.body.id = decoded.id;
                    req.body.cedula = decoded.cedula;
                    return next();
                } else {
                    //console.log(err);
                    return res.status(401).json({
                        status_code: 401,
                        msg: "Token no es válido: " + err,
                        data: null,
                    });
                }
            });
        } else {
            return res.status(401).json({
                status_code: 401,
                msg: "Token está vacio",
                data: null,
            });
        }
    },
}