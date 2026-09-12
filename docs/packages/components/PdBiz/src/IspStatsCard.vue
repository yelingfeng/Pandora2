<template>
  <div class="pd-biz-isp-stats-card">
    <div class="stats-wrapper">
      <div class="isp-groups">
        <div v-for="(group, ispKey) in groupedData" :key="ispKey" class="isp-group">
          <div class="isp-section">
            <div class="isp-info">
              <div class="isp-icon">
                <img
                  v-if="getIspIcon(ispKey)"
                  :src="getIspIcon(ispKey)"
                  class="isp-icon-img"
                  alt=""
                />
                <div v-else class="icon-default"></div>
              </div>
              <div class="isp-name">{{ getIspDisplayName(ispKey) }}</div>
            </div>
            <div class="status-section">
              <div v-for="(item, index) in group" :key="index" class="status-item">
                <span class="status-value">{{ item.count }}</span>
                <span class="status-label">{{ item.flag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IIspStatsCardProps, IIspStatItem } from './types'
import iconYidong from './assets/yidong.png'
import iconLiantong from './assets/liantong.png'
import iconDianxin from './assets/dianxin.png'

const props = withDefaults(defineProps<IIspStatsCardProps>(), {
  data: () => [],
  ispMap: () => ({
    '0': '移动',
    '1': '联通',
    '3': '电信'
  }),
  ispOrder: () => ['0', '1', '3']
})

const ispIconMap: Record<string, string> = {
  '0': iconYidong,
  '1': iconLiantong,
  '3': iconDianxin
}

const groupedData = computed(() => {
  const groups: Record<string, IIspStatItem[]> = {}
  props.data.forEach((item) => {
    const ispKey = String(item.isp)
    if (!groups[ispKey]) {
      groups[ispKey] = []
    }
    groups[ispKey].push(item)
  })

  const sortedGroups: Record<string, IIspStatItem[]> = {}
  props.ispOrder.forEach((isp) => {
    if (groups[isp]) {
      sortedGroups[isp] = groups[isp]
    }
  })

  return sortedGroups
})

const getIspDisplayName = (isp: string) => {
  return props.ispMap[isp] || `运营商${isp}`
}

const getIspIcon = (isp: string) => {
  return ispIconMap[isp] || ''
}
</script>

<style lang="scss" scoped>
.pd-biz-isp-stats-card {
  width: 100%;

  .stats-wrapper {
    display: flex;
    align-items: stretch;
    width: 100%;
    overflow: hidden;
    background: #fafbfc;
  }

  .isp-groups {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: space-between;
  }

  .isp-group {
    flex: 1;
    border-radius: 10px;
    background: #f5f7fa;
    overflow: hidden;
    min-width: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .isp-section {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    gap: 24px;
  }

  .isp-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;
    flex-shrink: 0;
  }

  .isp-icon {
    width: 42px;
    height: 42px;
    border-radius: 24px;
    background-color: #e0ebff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .isp-icon-img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    display: block;
  }

  .icon-default {
    width: 32px;
    height: 32px;
    background-color: #f5f6f7;
    border-radius: 16px;
  }

  .isp-name {
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    text-align: center;
    line-height: 1.2;
    margin-top: 5px;
  }

  .status-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 5px;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  }

  .status-label {
    font-size: 13px;
    color: #909399;
    text-align: center;
    margin-top: 4px;
  }

  .status-value {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    text-align: center;
  }

  @media (max-width: 1200px) {
    .stats-wrapper {
      padding: 14px 16px;
    }

    .isp-groups {
      gap: 16px;
    }

    .isp-section {
      padding: 14px 16px;
      gap: 20px;
    }

    .isp-info {
      min-width: 70px;
    }

    .isp-icon {
      width: 40px;
      height: 40px;
    }

    .isp-name {
      font-size: 13px;
    }

    .status-section {
      gap: 10px;
    }

    .status-value {
      font-size: 16px;
    }

    .status-label {
      font-size: 12px;
    }
  }

  @media (max-width: 900px) {
    .stats-wrapper {
      padding: 12px 14px;
    }

    .isp-groups {
      gap: 12px;
    }

    .isp-section {
      padding: 12px 14px;
      gap: 16px;
    }

    .isp-info {
      min-width: 60px;
    }

    .isp-icon {
      width: 36px;
      height: 36px;
      margin-bottom: 6px;
    }

    .isp-name {
      font-size: 12px;
    }

    .status-section {
      gap: 8px;
    }

    .status-item {
      padding: 8px 4px;
    }

    .status-value {
      font-size: 15px;
    }

    .status-label {
      font-size: 11px;
    }
  }

  @media (max-width: 600px) {
    .isp-groups {
      flex-direction: column;
      gap: 16px;
    }

    .isp-group {
      width: 100%;
    }

    .isp-section {
      flex-direction: row;
      align-items: center;
    }

    .status-section {
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .status-item {
      padding: 8px 4px;
    }

    .status-value {
      font-size: 16px;
    }

    .status-label {
      font-size: 12px;
      margin-top: 3px;
    }
  }
}
</style>
