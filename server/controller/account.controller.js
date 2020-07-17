import { getAccountsService, createAccountService, updateAccountService, deleteAccountService } from '../service/account.service'
import { getPaginationItems, validateEmail } from '../utils/helper'
import queryString from 'query-string'
import message from '../constant/message'

const getAccountsController = async (req, res) => {
    const { query } = req
    const pagination = getPaginationItems(query.page, query.limit)
    delete query.page;
    delete query.limit;
    const data = await getAccountsService(query, pagination.limit, pagination.skip)
    return res.json({
        success: true,
        data: data.accounts || [],
        page: query.page || 1,
        total: data.total || 0
    })
}

const createAccountController = async(req, res) => {
    const data = req.body
    const { email, fullName, accountNumber, balance, gender } = data
    if (!validateEmail(email)) {
        return res.json({
            success: false,
            message: message.MSG0002
        })
    }
    if (!(Number(balance) >= 0)) {
        return res.json({
            success: false,
            message: message.MSG0003
        })
    }
    if (!fullName) {
        return res.json({
            success: false,
            message: message.MSG0004
        })
    }
    if (!accountNumber) {
        return res.json({
            success: false,
            message: message.MSG0005
        })
    }
    if (!(Number(gender) === 1 || Number(gender) === 2)) {
        return res.json({
            success: false,
            message: message.MSG0006
        })
    }
    const account = await createAccountService(data)
    if (!account.result) {
        return res.json({
            success: false,
            message: account.message
        })
    }
    return res.json({
        success: true,
        data: account.value
    })
}

const updateAccountController = async (req, res) => {
    const id = req.params.id
    const data = req.body
    const { email, fullName, accountNumber, balance, gender } = data
    if (!validateEmail(email)) {
        return res.json({
            success: false,
            message: message.MSG0002
        })
    }
    if (!(Number(balance) >= 0)) {
        return res.json({
            success: false,
            message: message.MSG0003
        })
    }
    if (!fullName) {
        return res.json({
            success: false,
            message: message.MSG0004
        })
    }
    if (!accountNumber) {
        return res.json({
            success: false,
            message: message.MSG0005
        })
    }
    if (!(Number(gender) === 1 || Number(gender) === 2)) {
        return res.json({
            success: false,
            message: message.MSG0006
        })
    }
    const account = await updateAccountService(id, data)
    if (!account.result) {
        return res.json({
            success: false,
            message: account.message
        })
    }
    return res.json({
        success: true
    })
}

const deleteAccountController = async (req, res) => {
    const id = req.params.id
    const account = await deleteAccountService(id)
    if (!account.result) {
        return res.json({
            success: false,
            message: account.message
        })
    }
    return res.json({
        success: true
    })
}

export {
    getAccountsController,
    createAccountController,
    updateAccountController,
    deleteAccountController
}