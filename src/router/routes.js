
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
        { path: '/', component: () => import('pages/auth/Login.vue') },
        { path: '/register', component: () => import('pages/auth/Register.vue') },
    ]
},
{
  path: '/admin',
  component: () => import('layouts/Dash.vue'),
  children: [
    { path: '/admin', component: () => import('pages/admin/Index.vue') },

    { path: '/products/add', component: () => import('pages/admin/AddProductPage.vue') },
    { path: '/products', component: () => import('pages/admin/ProductPage.vue') },
    
    // { path: 'users', component: () => import('pages/admin/Users.vue') },
    // { path: 'nopermission', component: () => import('pages/admin/NoPermission.vue') },
    // { path: 'relatorios', component: () => import('pages/admin/Reports.vue') },


  ],

},
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
