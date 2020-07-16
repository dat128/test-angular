import permissions from '../config/permission'
import message from '../constant/message'

const authorization = (roles) => async (req, res, next) => {
    try {
        if (!roles.includes(req.user.role)) {
            res.status(401)
            return res.json({
                result: false,
                message: message.MSG0011
            })
        }
        return next()
    } catch (error) {
        console.log(error)
        res.status(401)
        return res.json({
            result: false,
            message: message.MSG0011
        })
    }
}

// const authorization = async (req, res, next) => {
//     try {
//         const permission = permissions.find(item => item.url === req.baseUrl && item.method === req.method)
//         if(!permission.roles.includes(req.user.role)) {
//             res.status(401)
//             return res.json({
//                 result: false,
//                 message: "permission denied!"
//             })
//         }
//         return next()
//     } catch (error) {
//         console.log(error)
//         res.status(401)
//         return res.json({
//             result: false,
//             message: "permission denied!"
//         })
//     }
// }

export {
    authorization
}