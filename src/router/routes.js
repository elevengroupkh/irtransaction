
const routes = [
  { path: '/', component: () => import('pages/login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/dashboard.vue') },
      { path: '/dashboard_v2', component: () => import('pages/dashboard_v2.vue') },
      { path: '/dashboard_v3', component: () => import('pages/dashboard_v3.vue') },
      { path: '/customer_management', component: () => import('pages/customer_management.vue') },
      { path: '/user_management', component: () => import('pages/masterdata/user_management.vue') },
      { path: '/shift_management', component: () => import('pages/masterdata/shift_management.vue') },
      { path: '/position_management', component: () => import('pages/masterdata/position_management.vue') },
      { path: '/bank_management', component: () => import('pages/masterdata/bank_management.vue') },
      { path: '/blacklist_management', component: () => import('pages/masterdata/blacklist_management.vue') },
      { path: '/companyaccount_management', component: () => import('pages/masterdata/companyaccount_management.vue') },
      { path: '/cashin', component: () => import('pages/cashin') },
      { path: '/cashout', component: () => import('pages/cashout') },
      { path: '/change_request', component: () => import('pages/change_request.vue') },
      { path: '/my_profile', component: () => import('pages/my_profile.vue') },
      { path: '/sales_invoices', component: () => import('pages/sales_invoices.vue') },
      { path: '/quotes', component: () => import('pages/quotes.vue') },
      { path: '/transactions', component: () => import('pages/transactions.vue') },
      { path: '/employee_salary_list', component: () => import('pages/employee_salary_list.vue') },
      { path: '/calendar', component: () => import('pages/calendar.vue') },
      { path: '/department', component: () => import('pages/department.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
