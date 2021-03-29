<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
 
        <article-meta :article="article" :self='self' />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body" />
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" :self='self' />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article';
import { mapState } from 'vuex'
import MarkdownIt from 'markdown-it';
import ArticleMeta from './article-meta';
import ArticleComment from './article-comment';
export default {
  name: 'Article',
  components: { ArticleMeta, ArticleComment },
  computed: {
    ...mapState(['user']),
    self() {
      return this.article.author.username === this.user.username
    }
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return { article };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
