<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" :onerror="errorImg" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="editSettings"
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my-articles'
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: user.username
                    },
                    query: {
                      tab: 'my-articles'
                    }
                  }"
                  exact
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited-articles'
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: user.username
                    },
                    query: {
                      tab: 'favorited-articles'
                    }
                  }"
                  exact
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <article-preview :articles="articles" />

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: item === page }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'profile',
                    params: {
                      username: user.username
                    },
                    query: {
                      tab,
                      page: item
                    }
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles } from '@/api/article'
import ArticlePreview from '../article/article-preview'
export default {
  name: 'Profile',
  middleware: 'authenticated',
  watchQuery: ['tab', 'page'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  data() {
    return {
      errorImg: require('~/assets/smiley-cyrus.png')
    }
  },
  async asyncData({ query, params }) {
    const { tab = 'my-articles' } = query
    const page = Number.parseInt(query.page || 1)
    const limit = 2
    const _params = {
      offset: (page - 1) * limit,
      limit
    }
    if (tab === 'my-articles') _params.author = params.username
    if (tab === 'favorited-articles') _params.favorited = params.username
    const { data } = await getArticles(_params)
    const { articles, articlesCount } = data
    return {
      tab,
      articles,
      page,
      limit,
      articlesCount
    }
  },
  components: { ArticlePreview },
  methods: {
    editSettings() {
      this.$router.push('/settings')
    }
  }
}
</script>

<style lang="scss" scoped></style>
