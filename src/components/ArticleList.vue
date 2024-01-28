<template>
  <div class="article-list">
    <h2>文章列表</h2>
    <ul>
      <li v-for="(article, index) in paginatedArticles" :key="article.id" class="article-item">
        <div class="tooltip">
          <a :href="`/article/${article.id}`" target="_blank" class="article-link">
            <span :style="{ background: getColor(index), '-webkit-background-clip': 'text', 'background-clip': 'text', 'color': 'transparent' }">
              {{ article.title }}
            </span>
          </a>
          <span class="tooltip-text" v-html="getTooltipText(article.id)"></span>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <button
          v-if="hasPreviousPage"
          @click="setCurrentPage(currentPage - 1)"
      >
        上一页
      </button>

      <button
          v-for="page in visiblePages"
          :key="page"
          :class="{ 'active-page': currentPage === page }"
          @click="setCurrentPage(page)"
      >
        {{ page }}
      </button>

      <button
          v-if="hasNextPage"
          @click="setCurrentPage(currentPage + 1)"
      >
        下一页
      </button>

      <div class="page-input">
        <input type="number" v-model.number="inputPage" @keyup.enter="jumpToPage" placeholder="跳转到页码" />
      </div>
    </div>
  </div>
</template>

<script>
import articlesIndex from '@/assets/articlesIndex.json';
import articles from '@/assets/articles.json';

export default {
  data() {
    return {
      articlesIndex,
      currentPage: 1,
      articlesPerPage: 10,
      inputPage: null, // 用户输入的页码
      gradientColors: [
        'linear-gradient(to right, #FF7E5F, #FEB47B)', // 黄昏橙
        'linear-gradient(to right, #FEB47B, #FF6E7F)', // 橙粉过渡
        'linear-gradient(to right, #FF6E7F, #EF629F)', // 粉色到紫色
        'linear-gradient(to right, #EF629F, #C06C84)', // 深紫到蓝色
        'linear-gradient(to right, #C06C84, #6C5B7B)', // 深蓝
        'linear-gradient(to right, #6C5B7B, #355C7D)', // 更深的蓝色
        'linear-gradient(to right, #355C7D, #2193B0)', // 深夜蓝
        'linear-gradient(to right, #2193B0, #6DD5ED)', // 蓝色到浅蓝
        'linear-gradient(to right, #6DD5ED, #B24592)', // 浅蓝到午夜紫
        'linear-gradient(to right, #B24592, #FF7E5F)', // 午夜紫回到黄昏橙
      ],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.articlesIndex.length / this.articlesPerPage);
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.articlesIndex.slice(start, end);
    },
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage() {
      return this.currentPage < this.totalPages;
    },
    visiblePages() {
      const pages = [];
      if (this.currentPage > 1) pages.push(this.currentPage - 1);
      pages.push(this.currentPage);
      if (this.currentPage < this.totalPages) pages.push(this.currentPage + 1);
      return pages;
    }
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    jumpToPage() {
      if (this.inputPage >= 1 && this.inputPage <= this.totalPages) {
        this.setCurrentPage(this.inputPage);
      }
      this.inputPage = null; // 清空输入框
    },
    getColor(index) {
      return this.gradientColors[index % this.gradientColors.length];
    },
    extractBoldWords(content) {
      return content.flatMap(paragraph =>
          (paragraph.english.match(/<strong>(.*?)<\/strong>/g) || [])
              .map(m => m.replace(/<\/?strong>/g, ''))
      );
    },
    getTooltipText(articleId) {
      const article = articles[articleId];
      if (article && article.content) {
        const boldWords = this.extractBoldWords(article.content);
        const formattedWords = boldWords.map(word => `<strong><em>${word}</em></strong>`);
        return `You can learn ${formattedWords.join(', ')} from this article.`;
      }
      return '';
    },
  },
};
</script>

<style>
.article-list {
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fafafa;
}

.article-list h2 {
  margin-bottom: 20px;
}

.article-list ul {
  list-style-type: none;
  padding: 0;
}

.article-item {
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: #f0f0f0; /* 略深的背景色 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-link {
  display: block; /* 使链接填充整个文章项 */
  text-decoration: none;
  padding: 10px; /* 文章项内部的填充 */
  border: 1px solid #e0e0e0; /* 文章项的边框 */
  transition: background-color 0.3s;
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.article-link:hover {
  background-color: #e0e0e0; /* 悬浮时背景颜色变化 */
}

.article-item:hover {
  transform: scale(1.03); /* 鼠标悬停时轻微放大 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* 增加阴影以增强效果 */
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
}

.pagination button.active-page {
  background-color: #0056b3;
  color: white;
}

.page-input input {
  margin-left: 10px;
  padding: 5px;
  width: 100px;
}

.tooltip .tooltip-text {
  visibility: hidden;
  width: 420px;
  background-color: #f9f9f9;
  color: #333;
  text-align: left;
  border-radius: 8px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 80%;
  margin-left: -110px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
  transform: translateY(10px);
}

.tooltip .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 10%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #f9f9f9 transparent transparent transparent;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

</style>
