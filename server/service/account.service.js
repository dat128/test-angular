import Account from '../model/Account'
import message from '../constant/message'

const getAccountsService = async (query, limit, skip) => {
    const gender = query.gender || null
    const fullName = new RegExp(query.fullName, 'i')
    const accountNumber = new RegExp(query.accountNumber, 'i')
    const email = new RegExp(query.email, 'i')
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
        ]
    }
    if (gender) {
        queryDb.$and.push({ gender })
    }
    if (col && sort) {
        sortCondition[col] = sort === 'desc' ? -1 : 1
    }
    const accounts = await Account.find(queryDb).limit(limit).skip(skip).sort(sortCondition)
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
    console.log('123', value);
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
        if (account.id !== id) {
            return {
                result: false,
                message: message.MSG0007
            }
        }
    }
    if (data.account_number) {
        account = await Account.findOne({ accountNumber: data.accountNumber })
        if (account.id !== id) {
            return {
                result: false,
                message: message.MSG0008
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
    console.log(updValue)
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
    console.log(value)
    return {
        result: true,
        data: value
    }
}

export {
    getAccountsService,
    createAccountService,
    updateAccountService,
    deleteAccountService
}