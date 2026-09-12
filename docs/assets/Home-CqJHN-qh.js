var e=`<template>
  <div class="home-container">
    <section class="banner">
      <div class="banner-glow" aria-hidden="true"></div>
      <img src="@/assets/pandora-logo.png" alt="Pandora Logo" class="logo" />
      <h1 class="title">Pandora<span class="accent">2</span></h1>
      <p class="description">基于 Vue 3 + TypeScript + Element Plus 的业务组件库</p>
      <p class="sub">用 Schema / 配置驱动，减少后台 View 层样板代码</p>
      <div class="actions">
        <el-button type="primary" size="large" @click="goStart">快速开始</el-button>
        <el-button size="large" @click="goGithub">GitHub</el-button>
      </div>
    </section>

    <section class="features">
      <div v-for="item in featureList" :key="item.title" class="feature-item">
        <div class="icon-wrapper">{{ item.icon }}</div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </section>

    <section class="products">
      <h2>核心能力</h2>
      <div class="product-grid">
        <router-link
          v-for="item in productList"
          :key="item.path"
          :to="item.path"
          class="product-card"
        >
          <div class="product-icon" :style="{ background: item.bg }">{{ item.icon }}</div>
          <div class="product-meta">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <section class="tech-stack">
      <h2>技术栈版本</h2>
      <div class="stack-table">
        <div class="stack-header">
          <span>Vue</span>
          <span>Element Plus</span>
          <span>TypeScript</span>
        </div>
        <div class="stack-row">
          <span>{{ dependencies.vue }}</span>
          <span>{{ dependencies.elementPlus }}</span>
          <span>{{ devDependencies.typescript }}</span>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>
        Created by
        <a href="https://github.com/yelingfeng" target="_blank" rel="noopener noreferrer"
          >yelingfeng</a
        >
        · MIT License
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const dependencies = {
  vue: '3.5.26',
  elementPlus: '2.13.1'
}
const devDependencies = {
  typescript: '5.9.3'
}

const featureList = [
  {
    icon: '⚡',
    title: '快速开发',
    desc: '基于 JSON / Schema 配置生成表单与表格，减少模板代码，提升交付效率。'
  },
  {
    icon: '🔷',
    title: 'TypeScript',
    desc: '完整类型定义与泛型推导，IDE 提示更准确，重构更安全。'
  },
  {
    icon: '🧩',
    title: '组件丰富',
    desc: '覆盖表单、表格、布局、图表与业务组件，开箱即用。'
  }
]

const productList = [
  {
    title: 'PdForm',
    desc: 'Schema 驱动动态表单',
    path: '/components/PdForm',
    icon: 'F',
    bg: 'linear-gradient(135deg, #5B8CFF 0%, #5AD8FF 100%)'
  },
  {
    title: 'PdTable',
    desc: '配置驱动数据表格',
    path: '/components/PdTable',
    icon: 'T',
    bg: 'linear-gradient(135deg, #6971ff 0%, #5B8CFF 100%)'
  },
  {
    title: 'PdPageLayout',
    desc: '表单 + 表格页面布局',
    path: '/components/PdPageLayout',
    icon: 'L',
    bg: 'linear-gradient(135deg, #36cfc9 0%, #5AD8FF 100%)'
  },
  {
    title: 'PdCharts',
    desc: 'ECharts 响应式封装',
    path: '/components/Chart',
    icon: 'C',
    bg: 'linear-gradient(135deg, #ff8a7f 0%, #FF6A5F 100%)'
  },
  {
    title: 'PdBiz',
    desc: '常用业务场景组件',
    path: '/components/CommonCard',
    icon: 'B',
    bg: 'linear-gradient(135deg, #b37feb 0%, #6971ff 100%)'
  }
]

const goStart = () => {
  router.push('/components/Install')
}

const goGithub = () => {
  window.open('https://github.com/yelingfeng/Pandora2', '_blank')
}
<\/script>

<style scoped lang="less">
.home-container {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;

  .banner {
    position: relative;
    padding: 56px 0 48px;
    overflow: hidden;

    .banner-glow {
      position: absolute;
      inset: -30% -10% auto;
      height: 320px;
      background:
        radial-gradient(closest-side, rgba(91, 140, 255, 0.28), transparent 70%),
        radial-gradient(closest-side at 70% 40%, rgba(90, 216, 255, 0.2), transparent 65%),
        radial-gradient(closest-side at 30% 60%, rgba(255, 106, 95, 0.1), transparent 60%);
      filter: blur(4px);
      pointer-events: none;
    }

    .logo {
      position: relative;
      height: 96px;
      margin-bottom: 16px;
    }

    .title {
      position: relative;
      margin: 8px 0 12px;
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--pd-text, rgba(0, 0, 0, 0.88));
      line-height: 1.2;
    }

    .accent {
      color: var(--pd-accent, #ff6a5f);
    }

    .description {
      position: relative;
      margin: 0 0 8px;
      font-size: 18px;
      color: var(--pd-text-secondary, rgba(0, 0, 0, 0.65));
    }

    .sub {
      position: relative;
      margin: 0 0 32px;
      font-size: 14px;
      color: var(--pd-text-tertiary, rgba(0, 0, 0, 0.45));
    }

    .actions {
      position: relative;
      display: flex;
      justify-content: center;
      gap: 12px;
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 24px 0 48px;
    text-align: left;

    .feature-item {
      padding: 24px;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: var(--pd-radius-lg, 12px);
      backdrop-filter: blur(8px);
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

      &:hover {
        border-color: var(--pd-primary-border, rgba(91, 140, 255, 0.35));
        box-shadow: var(--pd-shadow-sm);
        transform: translateY(-2px);
      }

      .icon-wrapper {
        margin-bottom: 12px;
        font-size: 28px;
        line-height: 1;
      }

      h3 {
        margin: 0 0 8px;
        font-size: 16px;
        color: var(--pd-text, rgba(0, 0, 0, 0.88));
      }

      p {
        margin: 0;
        color: var(--pd-text-secondary, rgba(0, 0, 0, 0.65));
        line-height: 1.6;
        font-size: 14px;
      }
    }
  }

  .products {
    margin: 0 0 48px;
    text-align: left;

    h2 {
      margin: 0 0 20px;
      font-size: 22px;
      text-align: center;
      border: none;
      padding: 0;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .product-card {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 18px 20px;
      text-decoration: none;
      background: rgba(255, 255, 255, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.9);
      border-radius: var(--pd-radius, 8px);
      backdrop-filter: blur(8px);
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;

      &:hover {
        border-color: var(--pd-primary-border, rgba(91, 140, 255, 0.35));
        box-shadow: var(--pd-shadow-sm);
        transform: translateY(-2px);
      }

      .product-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        color: #fff;
        font-weight: 700;
        font-size: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .product-meta {
        min-width: 0;

        h3 {
          margin: 0 0 4px;
          font-size: 15px;
          color: var(--pd-text, rgba(0, 0, 0, 0.88));
        }

        p {
          margin: 0;
          font-size: 13px;
          color: var(--pd-text-tertiary, rgba(0, 0, 0, 0.45));
          line-height: 1.5;
        }
      }
    }
  }

  .tech-stack {
    margin: 0 0 48px;

    h2 {
      margin: 0 0 20px;
      font-size: 22px;
      border: none;
      padding: 0;
    }

    .stack-table {
      border: 1px solid var(--pd-border, #f0f0f0);
      border-radius: var(--pd-radius, 8px);
      overflow: hidden;
      max-width: 560px;
      margin: 0 auto;

      .stack-header,
      .stack-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 14px 16px;
      }

      .stack-header {
        background: var(--pd-fill-secondary, rgba(0, 0, 0, 0.02));
        font-weight: 600;
        color: var(--pd-text, rgba(0, 0, 0, 0.88));
        border-bottom: 1px solid var(--pd-border, #f0f0f0);
      }

      .stack-row {
        color: var(--pd-text-secondary, rgba(0, 0, 0, 0.65));
      }
    }
  }

  .footer {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--pd-border, #f0f0f0);
    color: var(--pd-text-tertiary, rgba(0, 0, 0, 0.45));
    font-size: 13px;

    p {
      margin: 0;
      text-align: center;
    }

    a {
      color: var(--pd-primary, #5b8cff);
      text-decoration: none;
    }
  }
}

@media (max-width: 768px) {
  .home-container {
    .banner .title {
      font-size: 36px;
    }

    .features {
      grid-template-columns: 1fr;
    }

    .products .product-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
`;export{e as default};