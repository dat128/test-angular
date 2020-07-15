import mongoose from 'mongoose';
import dbConfig from '../config/database.config';
import User from './User';
import Account from './Account';

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(
    err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    }
)

export {
    User,
    Account,
}