import { nextTick, onUnmounted, ref, unref, watch } from 'vue'
import type {
  ChartsActionType,
  ChartsProps,
  UseChartsReturnType
} from '../types'

export function useCharts(props?: Partial<ChartsProps>): UseChartsReturnType {
  const chartRef = ref<ChartsActionType | null>(null)
  const loadedRef = ref<boolean>(false)

  async function getChart() {
    const chart = unref(chartRef)
    if (!chart) {
      console.error(
        'The chart instance has not been obtained, please make sure that the chart has been rendered when performing the chart operation!'
      )
    }
    await nextTick()
    return unref(chartRef) as ChartsActionType
  }

  const register = (instance: ChartsActionType) => {
    onUnmounted(() => {
      chartRef.value = null
      loadedRef.value = false
    })

    if (unref(loadedRef) && instance === unref(chartRef)) return

    chartRef.value = instance
    loadedRef.value = true

    watch(
      () => props,
      () => {
        props && instance.setProps(props)
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: ChartsActionType = {
    setProps: async (props: Partial<ChartsProps>) => {
      const chart = await getChart()
      chart.setProps(props)
    },
    setOptions: async (options: any) => {
      const chart = await getChart()
      chart.setOptions(options)
    },
    resize: async () => {
      const chart = await getChart()
      chart.resize()
    },
    getInstance: () => {
        const chart = unref(chartRef)
        return chart?.getInstance()
    },
    showLoading: async (type?: string, opts?: any) => {
        const chart = await getChart()
        chart.showLoading(type, opts)
    },
    hideLoading: async () => {
        const chart = await getChart()
        chart.hideLoading()
    },
    clear: async () => {
        const chart = await getChart()
        chart.clear()
    },
    dispose: async () => {
        const chart = await getChart()
        chart.dispose()
    }
  }

  return [register, methods]
}
