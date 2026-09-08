<template>
  <div class="mykit-preview">
    <section class="preview-demo">
      <slot></slot>
    </section>

    <div v-show="codeVisible" class="source-code">
      <pre class="language-html"><code class="language-html">{{ previewSourceCode }}</code></pre>
    </div>

    <div class="preview-bottom" @click="showSourceCode">
      <span class="preview-toggle">
        <svg v-if="!codeVisible" viewBox="0 0 1024 1024" width="14" height="14">
          <path
            fill="currentColor"
            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM368 744c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8V280c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v464zm192 0c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8V280c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v464zm192 0c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8V280c0-4.4 3.6-8 8-8h56c4.4 0 8 3.6 8 8v464z"
          />
        </svg>
        <svg v-else viewBox="0 0 1024 1024" width="14" height="14">
          <path
            fill="currentColor"
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359c-1.2-1.5-1.9-3.3-1.9-5.2 0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
          />
        </svg>
        {{ codeVisible ? '收起代码' : '显示代码' }}
      </span>
    </div>
  </div>
</template>

<script>
import Prism from 'prismjs'
import './assets/prism.css'

const demoSourceModules = import.meta.glob('./_docs/**/docs/**/*.vue', {
  query: '?raw',
  import: 'default'
})

export default {
  props: {
    /** 组件名称 */
    compName: {
      type: String,
      default: '',
      require: true
    },
    /** 要显示代码的组件 */
    demoName: {
      type: String,
      default: '',
      require: true
    }
  },
  data() {
    return {
      sourceCode: '',
      codeVisible: false
    }
  },
  computed: {
    previewSourceCode() {
      return this.sourceCode.replace(/'\.\.\/\.\.\/index'/g, "'@yelingfeng/pandora2'")
    }
  },
  async mounted() {
    if (this.compName && this.demoName) {
      const key = `./_docs/${this.compName}/docs/${this.demoName}.vue`
      const loader = demoSourceModules[key]
      this.sourceCode = loader ? await loader() : `// 未找到源码：${key}`
    }
    await this.$nextTick()
    Prism.highlightAll()
  },
  methods: {
    async copyCode() {
      // this.$copyText(this.sourceCode);
    },
    showSourceCode() {
      this.codeVisible = !this.codeVisible
      if (this.codeVisible) {
        this.$nextTick(() => {
          Prism.highlightAll()
        })
      }
    }
  }
}
</script>

<style lang="less">
.mykit-preview {
  margin: 16px 0 28px;
  border: 1px solid var(--pd-border, #f0f0f0);
  border-radius: var(--pd-radius, 8px);
  background: rgba(255, 255, 255, 0.92);
  overflow: hidden;
  transition: box-shadow var(--pd-duration, 0.2s) var(--pd-ease, ease);

  &:hover {
    box-shadow: var(--pd-shadow-sm);
  }

  .preview-demo {
    position: relative;
    margin: 0;
    padding: 24px;
    overflow: hidden;
    transform: translateZ(0);
    background: linear-gradient(180deg, rgba(247, 249, 255, 0.65) 0%, rgba(255, 255, 255, 0.9) 100%);
  }
}

.source-code {
  position: relative;
  z-index: 10;
  background: var(--pd-bg-code, #f6f8fa);
  border-top: 1px solid var(--pd-border, #f0f0f0);

  pre {
    margin: 0 !important;
    border: none !important;
    border-radius: 0 !important;
    background: transparent !important;
  }
}

.language-html {
  margin: 0;
  padding: 16px 20px;
}

.preview-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-top: 1px solid var(--pd-border, #f0f0f0);
  background: var(--pd-bg-container, #fff);
  cursor: pointer;
  transition: background var(--pd-duration, 0.2s) var(--pd-ease, ease);

  &:hover {
    background: var(--pd-fill-secondary, rgba(0, 0, 0, 0.02));

    .preview-toggle {
      color: var(--pd-primary, #5b8cff);
    }
  }

  .preview-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--pd-text-tertiary, rgba(0, 0, 0, 0.45));
    font-size: 14px;
    user-select: none;
    transition: color var(--pd-duration, 0.2s) var(--pd-ease, ease);
  }
}
</style>
