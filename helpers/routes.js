//useful routes
rou = {
    main: '/',
    img: '/ImageProducts/',
    static: '/static/',
    //Customers
    login: '/auth/login',
    register: '/auth/register',
    forget: '/auth/forget',
    valid: '/auth/valid',
    //github
    github: '/auth/github',
    githubCallback: '/auth/github/callback',
    //google
    google: '/auth/google',
    googleCallback: '/auth/google/callback',
    //Products
    add: '/product/add',
    delete: '/product/delete',
    checkout: '/product/checkout',
    product: '/products/',
    //-user
    logout: '/user/logout',
    deleteAccount: '/user/deleteAccount',
}

module.exports = rou