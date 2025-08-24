import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import IntroVisual from '../components/Intro-Visual.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-before': () => h(IntroVisual)
    })
  },
  enhanceApp({ app }) {
    // 注册Intro-Visual组件
    app.component('IntroVisual', IntroVisual)
  }
}