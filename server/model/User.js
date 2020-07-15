import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import data from '../data/user.json';

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'normal'],
        default: 'admin',
    }
})

const User = mongoose.model('users', userSchema)

export default User;

Promise.all(
    data.map( async (item) => {
        const query = { user_name: item.user_name };
        const password = await bcrypt.hash(item.password, 10)
        item.password = password;
        const update = item;
        const option = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
        User.findOneAndUpdate(query, update, option, function(err, res) {
        })
    })
)


// data.forEach((item) => {
//     const query = { user_name: item.user_name };
//     const update = item;
//     const option = {
//         upsert: true,
//         new: true,
//         setDefaultsOnInsert: true
//     }
//     User.findOneAndUpdate(query, update, option, function(err, res) {
//     })
// })