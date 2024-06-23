const UserModel = require('../model/user.model')
class UserController
{
    static async loginUserController(user,pass,fcm){
        return await UserModel.loginUserModel(user,pass,fcm)
    }

    static  async updatePasswordController(cedula, pass){
        return await UserModel.updatePasswordModel(cedula, pass)
    }
}

module.exports = UserController