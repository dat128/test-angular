import Account from '../model/Account'
import message from '../constant/message'

const getAccountsService = async (query, limit, skip) => {
    const gender = query.gender || null
    const age = query.age || null
    const fullName = new RegExp(query.fullName, 'i')
    const accountNumber = new RegExp(query.accountNumber, 'i')
    const email = new RegExp(query.email, 'i')
    const city = new RegExp(query.city, 'i')
    const address = new RegExp(query.address, 'i')
    const col = query.col || null
    const sort = query.sort || null
    let sortCondition = {}
    const queryDb = {
        $and: [
            {
                fullName
            },
            {
                accountNumber
            },
            {
                email
            },
            {
                city
            },
            {
                address
            },
        ]
    }
    if (gender) {
        queryDb.$and.push({ gender })
    }
    if (age) {
        queryDb.$and.push({ age })
    }
    if (query.minBalance) {
        queryDb.$and.push({ balance: {
            $gte: query.minBalance
        } })
    }
    if (query.maxBalance) {
        queryDb.$and.push({ balance: {
            $lte: query.maxBalance
        } })
    }
    if (col && sort) {
        sortCondition[col] = sort === 'desc' ? -1 : 1
    }
    const accounts = await Account.find(queryDb).limit(limit).skip(skip).sort({...sortCondition, createdAt: -1})
    const total = await Account.countDocuments(queryDb)
    return {
        accounts,
        skip,
        total,
    }
}

const createAccountService = async (data) => {
    let account = await Account.findOne({ email: data.email })
    if (account) {
        return {
            result: false,
            message: message.MSG0007
        }
    }
    account = await Account.findOne({ accountNumber: data.accountNumber })
    if (account) {
        return {
            result: false,
            message: message.MSG0008
        }
    }
    const newAccount = new Account(data);
    const value = await newAccount.save()
    return {
        result: true,
        value
    };
}

const updateAccountService = async (id, data) => {
    let account = await Account.findById(id)
    if(!account) {
        return {
            result: false,
            message: message.MSG0009
        }
    }
    if (data.email) {
        account = await Account.findOne({ email: data.email })
        if(account) {
            if (!(String(account._id) === id)) {
                return {
                    result: false,
                    message: message.MSG0007
                }
            }
        }
    }
    if (data.accountNumber) {
        account = await Account.findOne({ accountNumber: data.accountNumber })
        if (account) {
            if (!(String(account._id) === id)) {
                return {
                    result: false,
                    message: message.MSG0008
                }
            }
        }
    }
    const updValue = await Account.updateOne(
        {
            _id: id
        },
        data,
        {
            upsert: true
        }
    )
    return {
        result: true,
        data: updValue
    }
}

const deleteAccountService = async (id) => {
    let account = await Account.findById(id)
    if(!account) {
        return {
            result: false,
            message: message.MSG0009
        }
    }
    const value = await account.remove()
    return {
        result: true,
        data: value
    }
}

const getAccountService = async (id) => {
    let account = await Account.findById(id)
    if(!account) {
        return {
            result: false,
            message: message.MSG0009
        }
    }
    return {
        result: true,
        data: account
    }
}

export {
    getAccountsService,
    createAccountService,
    updateAccountService,
    deleteAccountService,
    getAccountService
}