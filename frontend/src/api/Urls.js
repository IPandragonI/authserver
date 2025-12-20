const Urls = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
    },
    plan: {
        list: '/plans',
        get: '/plans/{id}',
        create: '/plans',
        update: '/plans/{id}',
        delete: '/plans/{id}',
    },
    company: {
        list: '/companies',
        get: '/companies/{id}',
        create: '/companies',
        update: '/companies/{id}',
        delete: '/companies/{id}',
    },
}

export default Urls;