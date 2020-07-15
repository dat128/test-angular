import bcrypt from 'bcrypt';

const comparePassword = async (password, passwordDB) => {
    const result = await bcrypt.compare(password, passwordDB)
    return result;
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

export {
    comparePassword,
    getPaginationItems,
}