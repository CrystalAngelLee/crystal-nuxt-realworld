<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="!self">
      <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }}
      {{ article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
    >
      <i class="ion-heart"></i>
      &nbsp; {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    </template>
    <template v-else>
      <button
        class="btn btn-outline-secondary btn-sm"
        @click="onEditArticle(article)"
      >
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-outline-danger btn-sm"
      @click="onDeleteArticle(article)"
    >
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
    </template>
  </div>
</template>

<script>
import {deleteArticle} from '@/api/article'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true,
    },
    self: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    onEditArticle(article) {
      this.$router.push({
        name: 'editor',
        params: {
          slug: article.slug
        }
      });
    },
    async onDeleteArticle(article) {
      await deleteArticle(article.slug)
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
