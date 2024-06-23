const { initializeApp } = require("firebase-admin/app");
const firebase = initializeApp();
const {getMessaging} = require("firebase-admin/messaging");
class NotificationPush
{
    static  async sentNotificationPush(token,title,body)
    {
        try{
            await getMessaging().send( {
                notification: {
                    title: title,
                    body: body
                },
                token: token
            })
            return 'NOTIFICATION SEND OK'
        }catch (e) {
            console.log(e)
            console.log(`ERROR SEND FCM : ${e.toString()}`)
        }
    }
}

module.exports = NotificationPush