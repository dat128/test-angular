import { getAccountsService } from '../service/account.service'
import { getPaginationItems } from '../utils/helper'
import queryString from 'query-string'

const getAccountsController = async (req, res) => {
    const { query } = req
    const pagination = getPaginationItems(query.page, query.limit)
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

export {
    getAccountsController
}