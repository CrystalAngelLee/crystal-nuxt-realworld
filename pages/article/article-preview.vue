<template>
  <div>
    <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link
                    class="author"
                    :to="{
                      name: 'profile',
                      params: {
                        username: article.author.username,
                      },
                    }"
                    >{{ article.author.username }}</nuxt-link
                  >
                  <span class="date">{{
                    article.createdAt | date('MMM DD, YYYY')
                  }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{
                    active: article.favorited,
                  }"
                  @click="onFavorite(article)"
                  :disabled="article.favoriteDisabled"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                class="preview-link"
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug,
                  },
                }"
              >
                <h1>
                  {{ article.title }}
                </h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
  </div>
</template>

<script>
import {
  onFavorite,
  onCancelFavorite,
} from '@/api/article';
  export default {
    name: "ArticlePreview",
    props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        // 取消赞
        await onCancelFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount -= 1;
      } else {
        // 赞
        await onFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      article.favoriteDisabled = false;
    },
  },
  }
</script>

<style lang="scss" scoped>

</style>