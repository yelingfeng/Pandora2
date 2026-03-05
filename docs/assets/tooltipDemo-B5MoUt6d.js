const t=`<template>
  <div class="demo-charts">
    <div class="demo-ops">
      <span class="ops-label">模式</span>
      <button class="demo-btn" :class="{ active: mode === 'default' }" @click="mode = 'default'">默认</button>
      <button class="demo-btn" :class="{ active: mode === 'row' }" @click="mode = 'row'">行模板</button>
      <button class="demo-btn" :class="{ active: mode === 'value' }" @click="mode = 'value'">值格式化</button>
      <button class="demo-btn" :class="{ active: mode === 'formatter' }" @click="mode = 'formatter'">整体模板</button>
      <button class="demo-btn" :class="{ active: mode === 'dom' }" @click="mode = 'dom'">自定义DOM</button>
      <span class="ops-label">主题</span>
      <button class="demo-btn" :class="{ active: themeMode === 'light' }" @click="themeMode = 'light'">Light</button>
      <button class="demo-btn" :class="{ active: themeMode === 'dark' }" @click="themeMode = 'dark'">Dark</button>
    </div>
    <Charts class="demo-echarts" @register="register" />
  </div>
</template>

<script setup>
import { Charts, useCharts } from '@pandora/components/PdCharts'
import { onMounted, ref, watch } from 'vue'

const [register, { setProps }] = useCharts({
  chartType: 'bar',
  subChartType: 'basicBar',
})

const mode = ref('default')
const themeMode = ref('light')

const data = [
  { category: 'A类', name: '1月', value: 3720 },
  { category: 'A类', name: '2月', value: 2920 },
  { category: 'A类', name: '3月', value: 2200 },
  { category: 'B类', name: '1月', value: 1420 },
  { category: 'B类', name: '2月', value: 3200 },
  { category: 'B类', name: '3月', value: 2420 }
]

function apply() {
  const tooltip =
    mode.value === 'row'
      ? {
        containerClass: 'tt-wrap tt-wrap--row',
        itemClass: 'tt-row tt-row--row',
        rowTemplate: (row, ctx) => {
          return \`<tr class="tt-row tt-row--row"><td class="tt-name"><span class="dot"></span><strong>\${row.name}</strong>：</td><td class="tt-value">\${row.value}\${ctx.unit ? \` <span class="tt-unit tt-unit--row">\${ctx.unit}</span>\` : ''}</td></tr>\`
        }
      }
      : mode.value === 'value'
        ? {
          containerClass: 'tt-wrap tt-wrap--value',
          itemClass: 'tt-row tt-row--value',
          valueFormatter: (val) => {
            const v = Number(val)
            return Number.isFinite(v) ? v.toFixed(2) : String(val)
          }
        }
        : mode.value === 'formatter'
          ? {
            formatter: (params, ctx) => {
              const title = params?.[0]?.name || ''
              const rows = params.map(p => {
                const v = p.value ?? '-'
                return \`<tr class="tt-row tt-row--fmt"><td class="tt-name"><span class="dot"></span><strong>\${p.seriesName}</strong>：</td><td class="tt-value"><span class="tt-value-text">\${v}</span>\${ctx.unit ? \` <span class="tt-unit">\${ctx.unit}</span>\` : ''}</td></tr>\`
              })
              return \`<div class="chart-tooltip tt-wrap tt-wrap--fmt"><div class="tt-title tt-title--fmt">\${title}</div><table class="tt-table">\${rows.join('')}</table></div>\`
            }
          }
          : mode.value === 'dom'
            ? {
              containerClass: 'tt-wrap tt-wrap--dom',
              itemClass: 'tt-row tt-row--dom',
              rowTemplate: (row, ctx) => {
                return \`
              <tr class="tt-row tt-row--dom">
                <td class="tt-name"><span class="dot"></span><span class="tt-series">\${row.name}</span>：</td>
                <td class="tt-value"><span class="tt-value-text">\${row.value}</span>\${ctx.unit ? \` <span class="tt-unit tt-unit--dom">\${ctx.unit}</span>\` : ''}</td>
              </tr>\`
              }
            }
            : {}

  setProps({
    data,
    chartConfig: {
      autoFormatView: {
        type: 'num',
        decimalPlaces: 1,
        unitName: '个'
      },
      themeMode: themeMode.value,
      tooltip
    }
  })
}

onMounted(apply)
watch([mode, themeMode], apply)
<\/script>

<style scoped>
.demo-charts {
  height: 360px;
  width: 100%;
}

.demo-ops {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 10px;
}

.ops-label {
  font-size: 12px;
  color: #666;
}

.demo-btn {
  height: 26px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: #1a1a1a;
  cursor: pointer;
}

.demo-btn.active {
  border-color: #5B8FF9;
  color: #5B8FF9;
}

.demo-echarts {
  height: calc(100% - 40px);
}

/* tooltip dom classes */
.chart-tooltip {
  min-width: 180px;
}

.chart-tooltip--dark {
  color: #F0F3F7;
}

.tt-title {
  margin-bottom: 6px;
  color: #999;

  .chart-tooltip--dark .tt-title {
    color: rgba(255, 255, 255, 0.85);
  }
}

.chart-tooltip--dark .tt-title--fmt {
  color: #E6F0FF;
}

.tt-title--fmt {
  font-weight: 600;
  color: #444;
}

.tt-table {
  .chart-tooltip--dark .tt-row .tt-name {
    color: #E6F0FF;
  }

  width: 100%;

  /* ensure transparent backgrounds in dark theme */
  .chart-tooltip--dark &,
  .chart-tooltip--dark .tt-row,
  .chart-tooltip--dark .tt-row td {
    background: transparent !important;
  }
}

.tt-row .tt-name {
  padding-right: 16px;
  color: #666;
}

.tt-row .tt-value {
  .chart-tooltip--dark .tt-row .tt-unit {
    color: rgba(255, 255, 255, 0.7);
  }

  text-align: right;
  font-weight: 500;
}

.tt-row .tt-unit {
  margin-left: 4px;
  color: #999;
  font-size: 11px;
}

.tt-wrap .tt-series {
  font-weight: 600;
  margin-left: 4px;
}
</style>
`;export{t as default};
