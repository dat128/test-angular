import { loginService } from '../service/user.service'

const loginController = async (req, res) => {
    const { password, user_name } = req.body
    const checkLogin = await loginService(user_name, password)
    if (checkLogin) {
        return res.json({
            success: true
        })
    }
    return res.json({
        success: false,
        message: 'user name or password incorrect!'
    })
}

export {
    loginController
}