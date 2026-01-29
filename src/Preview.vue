<template>
  <div class="mykit-preview">
    <section>
      <slot></slot>
    </section>

    <div v-show="codeVisible" class="source-code">
      <pre class="language-html"><code class="language-html">{{ previewSourceCode }}</code></pre>
    </div>

    <div class="preview-bottom">
      <span name="Code" @click="showSourceCode">{{
          this.codeVisible ? '关闭' : '查看代码'
      }}</span>
    </div>
  </div>
</template>

<script>
import Prism from 'prismjs'
import './assets/prism.css'

const demoSourceModules = import.meta.glob('./_docs/**/docs/*.vue', {
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
      return this.sourceCode.replace(
        /'\.\.\/\.\.\/index'/g,
        '\'@tencent/my-kit\''
      )
    }
  },
  async mounted() {
    if (this.compName && this.demoName) {
      const key = `./_docs/${this.compName}/docs/${this.demoName}.vue`
      const loader = demoSourceModules[key]
      this.sourceCode = loader
        ? await loader()
        : `// 未找到源码：${key}`
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
pre {
  line-height: 0;
}

.mykit-preview {
  border: 4px;
  border: 1px dashed #e7e7e7;
  padding: 10px;
  border-bottom: 1px dashed #e7e7e7;

  section {
    margin: 15px;
  }
}

// .source-code {
// max-height: 500px;
// }
.language-html {
  margin: 0;
  padding: 0 15px;
}

.preview-bottom {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px dashed #e7e7e7;

  span {
    cursor: pointer;
  }
}
</style>
