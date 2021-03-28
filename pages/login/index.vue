<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                minlength="8"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';

// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  name: 'Login',
  middleware: 'notAuthenticated',
  computed: {
    isLogin() {
      return this.$route.name === 'login';
    },
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: {}, // 错误信息
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        // 存储用户登录状态
        this.$store.commit('setUser', data.user);
        // 登录状态持久化
        Cookie.set('user', data.user);
        this.$router.push('/');
      } catch (error) {
        // console.dir(error);
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
