const Urls = {
    auth: {
        login: '/auth/login/{realm}',
        register: '/auth/register/{realm}',
        forgotPassword: '/auth/forgot-password/{realm}',
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
    user: {
        list: '/users',
        get: '/users/{id}',
        create: '/users',
        update: '/users/{id}',
        delete: '/users/{id}',
    },
    role: {
        list: '/roles',
        get: '/roles/{id}',
        create: '/roles',
        update: '/roles/{id}',
        delete: '/roles/{id}',
    },
    realm: {
        list: '/realms',
        get: '/realms/{id}',
        create: '/realms',
        update: '/realms/{id}',
        delete: '/realms/{id}',
    }
}

export default Urls;