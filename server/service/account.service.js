import Account from '../model/Account'

const getAccountsService = async (query, limit, skip) => {
    const gender = query.gender || null
    const user_name = new RegExp(query.user_name, 'i')
    const account_number = new RegExp(query.account_number, 'i')
    const email = new RegExp(query.email, 'i')
    const queryDb = {
        $and: [
            {
                user_name
            },
            {
                account_number
            },
            {
                email
            },
        ]
    }
    if (gender) {
        queryDb.$and.push({ gender })
    }
    const accounts = await Account.find(queryDb).limit(limit).skip(skip)
    const total = await Account.countDocuments(queryDb)
    return {
        accounts,
        skip,
        total,
    }
}

export {
    getAccountsService
}