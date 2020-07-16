import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../private/config.json';

const comparePassword = async (password, passwordDB) => {
    const result = await bcrypt.compare(password, passwordDB)
    return result;
}

const hashPassword = async (password) => {
    const value = await bcrypt.hash(password, config.bcryptRound)
    return value
}

const getPaginationItems = function(page, limit) {
	page = parseInt(page);
	limit = parseInt(limit);
	if (!page) {
        page = 1
    }
    if (!limit) {
        limit = 50
    }
	return {
        skip: (page - 1) * limit,
        limit
	};
};

const validateEmail = function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const generateJWTToken = async function(data) {
    const token = await jwt.sign(
        {
            id: data._id,
            role: data.role,
            user_name: data.user_name
        },
        config.secretSignature,
        {
            expiresIn: config.tokenLife
        }
    )
    return token
}

const verifyJWTToken = async function(token) {
    const data = await jwt.verify(token, config.secretSignature)
    return data
}

export {
    comparePassword,
    getPaginationItems,
    validateEmail,
    hashPassword,
    generateJWTToken,
    verifyJWTToken,
}