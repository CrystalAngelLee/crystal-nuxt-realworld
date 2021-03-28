<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  required
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-on:keyup.enter="onTagEnter"
                  v-model="tag"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="tag in article.tagList"
                    :key="tag"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="onPublish"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/api/article';
export default {
  name: 'Editor',
  middleware: 'authenticated',
  data() {
    return {
      article: { title: '', description: '', body: '', tagList: [] },
      tag: '',
    };
  },
  methods: {
    onTagEnter() {
      if (!this.tag) return;
      this.article.tagList.push(this.tag);
      this.tag = '';
    },
    removeTag(tag) {
      this.article.tagList = this.article.tagList.filter((t) => t !== tag);
    },
    async onPublish() {
      try {
        const { data } = await createArticle({ article: this.article });
        // 跳转详情页面
        if (data.article && data.article.slug) {
          this.$router.push(`/article/${data.article.slug}`);
        }
      } catch (e) {
        console && console.error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
