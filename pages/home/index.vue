<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tag,
                      tab: 'tag'
                    }
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <template v-if="!articles">
            <div>No articles are here... yet.</div>
          </template>
          <template v-else>
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
                      name: 'home',
                      query: {
                        page: item,
                        tag: $route.query.tag,
                        tab
                      }
                    }"
                    >{{ item }}</nuxt-link
                  >
                </li>
              </ul>
            </nav>
            <!-- /分页列表 -->
          </template>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag,
                    tab: 'tag'
                  }
                }"
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
import ArticlePreview from '../article/article-preview'
export default {
  name: 'Home',
  watchQuery: ['page', 'tag', 'tab'],
  components: { ArticlePreview },
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 2
    const { tab = 'global_feed', tag } = query
    const g_article = ['global_feed', 'tag']
    const loadArticles = g_article.includes(tab) ? getArticles : getFeedArticles
    try {
      const [articleRes, tagsRes] = await Promise.all([
        loadArticles({
          limit,
          offset: (page - 1) * limit,
          tag
        }),
        getTags()
      ])
      const { articles, articlesCount } = articleRes.data
      const { tags } = tagsRes.data

      articles.forEach(article => (article.favoriteDisabled = false))

      return {
        articles,
        articlesCount,
        limit,
        page,
        tags,
        tab,
        tag
      }
    } catch (err) {}
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
}
</script>

<style lang="scss" scoped></style>
