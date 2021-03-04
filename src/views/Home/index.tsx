import { defineComponent } from 'vue'

import HelloWorld from '@/components/HelloWorld.vue'

import logo from '@/assets/logo.png'

import style from './index.module.less'

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <>
        <img src={logo} />
        {/* <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> */}
        <div class={style['home-title']}>这是一个样式测试1</div>
        <div class={style.homeTitleTest}>这是一个样式测试2</div>
      </>
    )
  }
})