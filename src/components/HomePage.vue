<template>
  <div class="home-page-background">
    <div class="home-page-content">
      <h1>欢迎来到托福学习平台</h1>
      <div class="introduction">
        <p>
          传统记忆方法不再有效？<strong>我们的创新方法将改变这一切</strong>。
          通过引人入胜的故事，将单词学习与实际语境相结合，提供了一种既高效又有趣的学习体验。
          从今天开始，<strong>探索我们的文章</strong>，体验全新的学习方式，让您的托福备考之旅充满乐趣。
        </p>
      </div>
      <nav class="navigation">
        <router-link to="/about-us" class="nav-link">关于我们</router-link>
      </nav>
      <ArticleList />
    </div>
  </div>
</template>


<script>
import ArticleList from '@/components/ArticleList.vue';

export default {
  name: 'HomePage',
  components: {
    ArticleList
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* .home-page 类仅用于内容布局，不应用背景图 */
.home-page-background {
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh; /* 覆盖整个视口高度 */
  width: 100%; /* 覆盖整个视口宽度 */
}


.home-page-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}


.introduction p {
  color: #E76F51; /* 午夜蓝色调 */
}


/* 导航链接样式 */
.nav-link {
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  color: #fff; /* 链接文字颜色 */
  background-color: #0056b3; /* 浅普鲁士蓝 */
  border-radius: 25px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #004080; /* 悬浮时的稍深蓝色 */
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-page {
    padding: 10px;
  }
  .home-page h1 {
    font-size: 2em;
  }
}
</style>