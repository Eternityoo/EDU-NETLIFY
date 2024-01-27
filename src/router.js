import { createRouter, createWebHashHistory } from 'vue-router';

// 引入组件
import Home from '@/components/HomePage.vue';
import ArticlePage from '@/components/ArticlesPage.vue'; // 引入新的文章内容组件
import AboutUs from '@/components/AboutUs.vue';

const router = createRouter({
    history: createWebHashHistory(), // 更改为使用 createWebHashHistory
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/article/:id', // 路径保持不变
            name: 'Article',
            component: ArticlePage
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
