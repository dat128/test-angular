import mongoose, { Schema } from 'mongoose';

import data from '../data/account.json';

const accountSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    gender: {
        type: Number,
        enum: [1, 2],
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    }
})

const Account = mongoose.model('accounts', accountSchema)

export default Account;

Promise.all(
    data.map((item) => {
        const query = { accountNumber: item.accountNumber };
        const update = item;
        const option = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
        Account.findOneAndUpdate(query, update, option, function(err, res) {
        })
    })
)
