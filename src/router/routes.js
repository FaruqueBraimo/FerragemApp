
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
        { path: '/', component: () => import('pages/auth/Login.vue') },
        { path: '/register', component: () => import('pages/auth/Register.vue') },
        { path: '/choice', component: () => import('pages/Choice.vue') },

    ]
},

{
  path: '/sales/',
  component: () => import('layouts/salesLayout.vue'),
  children: [
      { path: '/', component: () => import('pages/sales/index.vue') },
      { path: '/sales/products', component: () => import('pages/sales/Products.vue') },
      { path: '/sales/invoices', component: () => import('pages/sales/priceInvoice.vue') },
      { path: '/sales/card', component: () => import('pages/sales/productCard.vue') },
      { path: '/sales/sale', component: () => import('pages/sales/Sales.vue') },
      { path: '/sales/invoice', component: () => import('pages/sales/Invoice.vue') },
      { path: '/sales/price', component: () => import('pages/sales/Price.vue') },
      { path: '/sales/editor', component: () => import('pages/sales/SaleEditor.vue') },


  ]
},

{
  path: '/admin',
  component: () => import('layouts/Dash.vue'),
  children: [
    { path: '/admin', component: () => import('pages/admin/Index.vue') },
    { path: '/category', component: () => import('pages/admin/CategoryPage.vue') },

    { path: '/products/add/:id', component: () => import('pages/admin/AddProductPage.vue') },
    { path: '/products/:id', component: () => import('pages/admin/ProductDatailsPage.vue') },

    { path: '/products/', component: () => import('pages/admin/ProductPage.vue') },

    { path: '/providers', component: () => import('pages/admin/ProviderPage.vue') },
    
    { path: '/customers', component: () => import('pages/admin/CustomerPage.vue') },
    
    { path: '/users', component: () => import('pages/admin/UsersPage.vue') },
    { path: '/roles', component: () => import('pages/admin/userRoles.vue') },

    { path: '/barcode', component: () => import('pages/admin/BarCodeReader.vue') },
    { path: '/entradas', component: () => import('pages/admin/stockEntryPage.vue') },
    { path: '/saidas', component: () => import('pages/admin/stockExitPage.vue') },
    { path: '/reportSale', component: () => import('pages/admin/SalesReport.vue') },
    { path: '/stockEditor', component: () => import('pages/admin/stockEditor.vue') },

    
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
