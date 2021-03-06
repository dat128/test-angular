import { loginService } from '../service/user.service'
import { generateJWTToken } from '../utils/helper'
import message from '../constant/message'

const loginController = async (req, res) => {
    const { password, username } = req.body
    const checkLogin = await loginService(username, password)
    if (checkLogin.result) {
        const accessToken = await generateJWTToken(checkLogin.user)
        return res.json({
            success: true,
            accessToken,
            user: checkLogin.user
        })
    }
    return res.json({
        success: false,
        message: message.MSG0001
    })
}

export {
    loginController
}