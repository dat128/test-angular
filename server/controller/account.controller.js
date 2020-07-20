import { getAccountsService, createAccountService, updateAccountService, deleteAccountService, getAccountService } from '../service/account.service'
import { getPaginationItems, validateEmail } from '../utils/helper'
import queryString from 'query-string'
import message from '../constant/message'

const getAccountsController = async (req, res) => {
    const { query } = req
    const pagination = getPaginationItems(query.page, query.limit)
    query.fullName = query.fullName ? query.fullName.trim() : ''
    query.balance = query.balance ? query.balance.trim() : ''
    query.accountNumber = query.accountNumber ? query.accountNumber.trim() : ''
    query.email = query.email ? query.email.trim() : ''
    query.age = query.age ? query.age.trim() : ''
    query.address = query.address ? query.address.trim() : ''
    query.city = query.city ? query.city.trim() : ''
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
    data.fullName = data.fullName ? data.fullName.trim() : ''
    data.balance = data.balance ? data.balance.trim() : ''
    data.accountNumber = data.accountNumber ? data.accountNumber.trim() : ''
    data.email = data.email ? data.email.trim() : ''
    data.age = data.age ? data.age.trim() : ''
    data.address = data.address ? data.address.trim() : ''
    data.city = data.city ? data.city.trim() : ''
    const { email, fullName, accountNumber, balance, gender, city, address, age } = data
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
    if (!city) {
        return res.json({
            success: false,
            message: message.MSG0015
        })
    }
    if (!address) {
        return res.json({
            success: false,
            message: message.MSG0016
        })
    }
    if (!age || Number(age) <= 0) {
        return res.json({
            success: false,
            message: message.MSG0017
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
        message: message.MSG0012,
        data: account.value
    })
}

const updateAccountController = async (req, res) => {
    const id = req.params.id
    const data = req.body
    data.fullName = data.fullName ? data.fullName.trim() : ''
    data.balance = data.balance ? data.balance.trim() : ''
    data.accountNumber = data.accountNumber ? data.accountNumber.trim() : ''
    data.email = data.email ? data.email.trim() : ''
    data.age = data.age ? data.age.trim() : ''
    data.address = data.address ? data.address.trim() : ''
    data.city = data.city ? data.city.trim() : ''
    const { email, fullName, accountNumber, balance, gender, city, address, age } = data
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
    if (!city) {
        return res.json({
            success: false,
            message: message.MSG0015
        })
    }
    if (!address) {
        return res.json({
            success: false,
            message: message.MSG0016
        })
    }
    if (!(Number(age) >= 0)) {
        return res.json({
            success: false,
            message: message.MSG0017
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
        message: message.MSG0013,
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
        success: true,
        message: message.MSG0014,
    })
}

const getAccountController = async (req, res) => {
    const id = req.params.id
    const account = await getAccountService(id)
    if (!account.result) {
        return res.json({
            success: false,
            message: account.message
        })
    }
    return res.json({
        success: true,
        data: account.data
    })
}

export {
    getAccountsController,
    createAccountController,
    updateAccountController,
    deleteAccountController,
    getAccountController
}