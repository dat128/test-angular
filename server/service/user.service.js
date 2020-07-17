import { comparePassword } from '../utils/helper'
import User from '../model/User'

const loginService = async (username, password) => {
    const user = await User.findOne({ username })
    if (!user || !password || !username) {
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