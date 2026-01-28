import { throttle } from 'echarts'
import {
  addListener,
  removeListener,
  type ResizeCallback,
} from 'resize-detector'
import { watch, type Ref } from 'vue'
import type { EChartsType } from '../types'
import type { AutoresizeProp } from '../types'

export function useAutoresize(
  chart: Ref<EChartsType | undefined>,
  autoresize: Ref<AutoresizeProp | undefined>,
  root: Ref<HTMLElement | undefined>
): void {
  let resizeListener: ResizeCallback | null = null

  watch(
    [root, chart, autoresize],
    ([root, chart, autoresize], _, cleanup) => {
      if (root && chart && autoresize) {
        const autoresizeOptions =
          autoresize === true ? {} : autoresize
        const { throttle: wait = 100, onResize } =
          autoresizeOptions

        const callback = () => {
          chart.resize()
          onResize?.()
        }

        resizeListener = wait
          ? throttle(callback, wait)
          : callback
        addListener(root, resizeListener)
      }

      cleanup(() => {
        if (root && resizeListener) {
          removeListener(root, resizeListener)
        }
      })
    }
  )
}
