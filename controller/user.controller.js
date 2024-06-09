const UserModel = require('../model/user.model')
class UserController
{
    static async loginUserController(user,pass){
        return await UserModel.loginUserModel(user,pass)
    }

    static  async updatePasswordController(cedula, pass){
        return await UserModel.updatePasswordModel(cedula, pass)
    }
}

module.exports = UserController