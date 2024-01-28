import { createRouter, createWebHistory } from 'vue-router';

// 引入组件
import Home from '@/components/HomePage.vue';
import ArticlePage from '@/components/ArticlesPage.vue'; // 引入新的文章内容组件
import AboutUs from '@/components/AboutUs.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/article/:id', // 保持路由路径和参数不变
            name: 'Article',
            component: ArticlePage // 更新为新的文章内容组件
        },
        {
            path: '/about-us',
            name: 'AboutUs',
            component: AboutUs
        }
        // 更多路由...
    ]
});

export default router;
