<template>
  <div class="pd-biz-common-card">
    <el-card class="card-container">
      <div class="card-title">
        <div class="title-header">
          <div v-show="showTips" class="title-tip">
            <el-tooltip :content="titleTip" placement="top">
              <el-icon><InfoFilled /></el-icon>
            </el-tooltip>
          </div>
          <div class="title-text">{{ title }}</div>
          <div v-show="showIcon" class="link-icon" @click="handleClick"></div>
        </div>
        <slot name="titleRight"></slot>
      </div>
      <div class="card-content">
        <div v-show="loading" class="mask"></div>
        <PdBizLoading v-show="loading" />
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import PdBizLoading from './Loading.vue'
import type { ICommonCardProps } from './types'

defineOptions({
  name: 'PdBizCommonCard'
})

const props = withDefaults(defineProps<ICommonCardProps>(), {
  showIcon: true,
  showTips: false,
  loading: false
})

const emit = defineEmits<{
  clickHeader: []
}>()

const handleClick = () => {
  emit('clickHeader')
}
</script>

<style lang="scss" scoped>
.pd-biz-common-card {
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;
  width: 100%;
  height: 100%;

  :deep(.el-card__body) {
    height: 100%;
    padding: 5px 10px !important;
  }

  .card-container {
    height: 100%;
  }

  .mask {
    width: 100%;
    height: 100%;
    opacity: 0.1;
    position: absolute;
    left: 0;
    top: 0;
    background: #000;
    z-index: 1;
  }

  .card-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    display: flex;
    margin-left: 5px;
    height: 40px;
    line-height: 32px;
    border-bottom: 1px solid #e8e8e8;
    justify-content: space-between;
    align-items: center;
  }

  .title-header {
    display: flex;
    align-items: center;
    gap: 5px;

    .title-tip {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #909399;
    }

    .title-text {
      font-size: 14px;
    }

    .link-icon {
      cursor: pointer;
      width: 20px;
      height: 20px;
      background-size: 100%;
      background-repeat: no-repeat;
      flex-shrink: 0;

      &::after {
        content: '→';
        display: block;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #409eff;
      }
    }
  }

  .card-content {
    height: calc(100% - 45px);
    box-sizing: border-box;
    overflow: hidden;
    padding: 5px;
    position: relative;
  }
}
</style>
