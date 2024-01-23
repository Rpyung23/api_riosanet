const UserModel = require('../model/user.model')
class UserController
{
    static async loginUserController(user,pass){
        return await UserModel.loginUserModel(user,pass)
    }
}

module.exports = UserController