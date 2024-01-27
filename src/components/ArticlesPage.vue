<template>
  <div class="article" v-if="article">
    <h1 @click="playPronunciation($event)" v-html="wrapWords(article.title)"></h1>
    <div v-for="(paragraph, index) in article.content" :key="index">
      <p class="english" v-html="wrapWords(paragraph.english)" @click="playPronunciation($event)"></p>
      <p class="chinese" v-html="paragraph.chinese"></p>
    </div>
  </div>
</template>




<script>
import articles from '@/assets/articles.json';

export default {
  data() {
    return {
      article: null,
      voices: []
    };
  },
  computed: {
    articleId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.fetchArticle();
    this.initVoices();
  },
  methods: {
    fetchArticle() {
      const articleData = articles[this.articleId];
      if (articleData) {
        this.article = articleData;
      } else {
        console.error('Article not found');
      }
    },
    initVoices() {
      if (typeof speechSynthesis !== 'undefined') {
        speechSynthesis.onvoiceschanged = () => {
          this.voices = speechSynthesis.getVoices();
        };
      }
    },
    playPronunciation(event) {
      if (typeof speechSynthesis === 'undefined') {
        console.error('Speech Synthesis not supported.');
        return;
      }
      const word = event.target.textContent;
      const utterance = new SpeechSynthesisUtterance(word);
      let voice = this.voices.find(voice => voice.lang === 'en-US');
      if (!voice) {
        voice = this.voices.find(voice => voice.lang.startsWith('en'));
      }
      if (voice) {
        utterance.voice = voice;
      }
      speechSynthesis.speak(utterance);
    },
    wrapWords(text) {
      return text.split(/\s+/).map(word => {
        // 包裹每个单词
        if (!word.match(/<[^>]+>/)) {  // 排除 HTML 标签
          return `<span class="word">${word}</span>`;
        }
        return word;
      }).join(' ');
    }
  }
};
</script>

<style>
/* 整个网页的底色调整 */
.article {
  max-width: 800px;
  margin: 20px auto;
  padding: 40px;
  background-color: #ffffff; /* 文章区域的背景颜色 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.article h1 {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.article p {
  margin-bottom: 20px;
}

/* 加粗单词的样式 */
.article p strong {
  color: #0056b3;
  font-weight: bold;
  cursor: pointer;
}

/* 鼠标悬停在加粗单词上时的样式 */
.article p.english strong:hover {
  color: #FF5733; /* 加粗文本悬停时的颜色 */
}

/* 普通单词的样式 */
.english .word {
  cursor: pointer;
  transition: color 0.2s, transform 0.2s; /* 添加颜色和变换的过渡效果 */
}

/* 鼠标悬停在普通单词上时的样式 */
.english .word:hover {
  color: #0056b3; /* 普通文本悬停时的颜色 */
  font-weight: bold; /* 加粗效果 */
}

.article p.english {
  margin-bottom: 3px; /* 增加英文与中文段落之间的上边距 */
}

.article p.chinese {
  margin-bottom: 30px; /* 增加英文与中文段落之间的上边距 */
}

.article p.chinese strong {
  color: #0056b3;
  cursor: default; /* 设置光标为默认样式，而非抓手 */
  font-weight: bold; /* 保持加粗效果 */
}

.article h1 .word {
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
}

/* 标题中鼠标悬停在单词上时的样式 */
.article h1 .word:hover {
  color: #0056b3;
  font-weight: bold;
}

.article h1 .word :hover {
  color: #FF5733; /* 加粗文本悬停时的颜色 */
}
</style>
