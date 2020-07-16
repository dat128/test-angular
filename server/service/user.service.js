import { comparePassword } from '../utils/helper'
import User from '../model/User'

const loginService = async (user_name, password) => {
    const user = await User.findOne({ user_name })
    if (!user || !password || !user_name) {
        return false
    }
    const compare = await comparePassword(password, user.password)
    if (!compare) {
        return false
    }
    return {
        result: true,
        user
    }
}

export {
    loginService
}