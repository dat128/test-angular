import { verifyJWTToken } from '../utils/helper'
import User from '../model/User'
import message from '../constant/message'

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        if (!token) {
            res.status(401)
            return res.json({
                success: false,
                message: message.MSG0010
            })
        }
        const data = await verifyJWTToken(token)
        console.log(data)
        const user = await User.findById(data.id)
        if (!user) {
            res.status(401)
            return res.json({
                success: false,
                message: message.MSG0010
            })
        }
        req.user = user
        return next()
    } catch (error) {
        console.log(error)
        res.status(401)
        return res.json({
            success: false,
            message: message.MSG0010
        })
    }
}

export {
    authentication
}