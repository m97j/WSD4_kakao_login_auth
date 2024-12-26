import { createRouter, createWebHashHistory } from 'vue-router'; // 변경: createWebHistory -> createWebHashHistory
import SignIn from '@/vue/SignIn.vue';
import Home from '@/vue/home.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Home,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'HomeMain',
                component: () => import('@/views/home-main.vue'),
            },
            {
                path: 'popular',
                name: 'HomePopular',
                component: () => import('@/views/home-popular.vue'),
            },
            {
                path: 'wishlist',
                name: 'HomeWishList',
                component: () => import('@/views/home-wishlist.vue'),
            },
            {
                path: 'search',
                name: 'HomeSearch',
                component: () => import('@/views/home-search.vue'),
            }
        ]
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
    }
];

const router = createRouter({
    history: createWebHashHistory(), // 변경: createWebHistory -> createWebHashHistory
    routes,
});

router.beforeEach((to, _from, next): void => {
    const isAuthenticated = localStorage.getItem('authToken') !== null;

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'SignIn' });
        } else {
            next();
        }
    } else {
        if (to.name === 'SignIn' && isAuthenticated) {
            next({ name: 'Main' });
        } else {
            next();
        }
    }
});

export default router;
