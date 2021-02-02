//官方的元件
import Vue from 'vue'
import VueRouter from 'vue-router'


//自訂的元件
// import Dashboard from'@/components/dashboard';
// import Login from'@/components/pages/login';
// import Products from'@/components/pages/products';
// import Coupon from'@/components/pages/coupon';
// import Orders from'@/components/pages/orders';
// import CustomerOrder from'@/components/pages/customerOrder';
// import CustomerCheckout from'@/components/pages/customerCheckout';






Vue.use(VueRouter);



export default new VueRouter({
    linkActiveClass:"active",
    routes: [
        {
            path:'*',
            redirect:'login'

        },
        {
            name: '登入',
            path: '/login',
            component: () => import('@/components/pages/login'),
        },
        {
            name: '後台首頁',
            path: '/admin',
            component: () => import('@/components/dashboard'),
            children:[
                {
                    name: '產品列表',
                    path: 'products',
                    component: () => import('@/components/pages/products'),
                    meta: { requiresAuth: true },
                },
                {
                    name: '優惠卷',
                    path: 'coupon',
                    component: () => import('@/components/pages/coupon'),
                    meta: { requiresAuth: true },
                },
                {
                    name: '訂單列表',
                    path: 'orders',
                    component: () => import('@/components/pages/orders'),
                    meta: { requiresAuth: true },
                },
            ]
        },
        {
            name: '模擬首頁',
            path: '/front',
            component: () => import('@/components/dashboard'),
            children:[
                {
                    name: '模擬訂單',
                    path: 'customer_order',
                    component: () => import('@/components/pages/customerOrder'),
                },
                {
                    name: '訂單結帳',
                    path: 'Customer_checkout/:orderId',
                    component: () => import('@/components/pages/customerCheckout'),
                },
            ]
        },
    ]
})










// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]

// const router = new VueRouter({
//   routes
// })

// export default router
