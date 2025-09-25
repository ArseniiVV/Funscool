import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['vue'],
  rules: {
    'vue/html-self-closing': 'off',
  },
});
