const permissions = [
    {
        url: '/api/account',
        method: 'GET',
        roles: ['admin', 'normal'],
    },
    {
        url: '/api/account',
        method: 'POST',
        roles: ['admin'],
    },
    {
        url: '/api/account',
        method: 'PUT',
        roles: ['admin'],
    },
    {
        url: '/api/account',
        method: 'DELETE',
        roles: ['admin'],
    }
]

export default permissions