
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
  path: '/sales/',
  component: () => import('layouts/salesLayout.vue'),
  children: [
      { path: '/', component: () => import('pages/sales/index.vue') },
      { path: '/sales/products', component: () => import('pages/sales/Products.vue') },
      { path: '/sales/invoices', component: () => import('pages/sales/priceInvoice.vue') },


  ]
},

{
  path: '/admin',
  component: () => import('layouts/Dash.vue'),
  children: [
    { path: '/admin', component: () => import('pages/admin/Index.vue') },
    { path: '/category', component: () => import('pages/admin/CategoryPage.vue') },

    { path: '/products/add/:id', component: () => import('pages/admin/AddProductPage.vue') },
    { path: '/products/', component: () => import('pages/admin/ProductPage.vue') },

    { path: '/providers', component: () => import('pages/admin/ProviderPage.vue') },
    
    { path: '/customers', component: () => import('pages/admin/CustomerPage.vue') },
    
    { path: '/users', component: () => import('pages/admin/UsersPage.vue') },
    { path: '/roles', component: () => import('pages/admin/userRoles.vue') },

    { path: '/barcode', component: () => import('pages/admin/BarCodeReader.vue') },
    { path: '/entradas', component: () => import('pages/admin/stockEntryPage.vue') },


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
