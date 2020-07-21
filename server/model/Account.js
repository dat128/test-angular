import mongoose, { Schema } from 'mongoose';

import data from '../data/account.json';

const accountSchema = new Schema({
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['1', '2'],
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        accountNumber: {
            type: String,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }
    }, {
        timestamps: true
    }
)

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
