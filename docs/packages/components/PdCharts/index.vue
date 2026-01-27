<script lang="ts">
import { init as initChart } from 'echarts'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  toRefs,
  watch,
  watchEffect,
  type InjectionKey
} from 'vue'
import type {
  ChartsOption,
  EChartsType,
  Emits,
  InitOptionsInjection,
  ThemeInjection,
  UpdateOptions,
  UpdateOptionsInjection,
} from './types'
import { omitOn, unwrapInjected } from './utils'
import { build } from './utils/core'
import {
  register,
  TAG_NAME,
  type EChartsElement,
} from './utils/wc'

import {
  useAutoresize,
  useEventListener,
  useLoading,
  usePublicAPI,
} from './hooks/index'

import { defaultProps } from './props'

const wcRegistered = register()

if (typeof (window as any).Vue !== 'undefined' && (window as any).Vue.config) {
  (window as any).Vue.config.ignoredElements.push(TAG_NAME)
}
export const THEME_KEY =
  'ecTheme' as unknown as InjectionKey<ThemeInjection>
export const INIT_OPTIONS_KEY =
  'ecInitOptions' as unknown as InjectionKey<InitOptionsInjection>
export const UPDATE_OPTIONS_KEY =
  'ecUpdateOptions' as unknown as InjectionKey<UpdateOptionsInjection>

export default defineComponent({
  name: 'PdCharts',
  inheritAttrs: false,
  props: defaultProps,
  emits: {} as unknown as Emits,
  setup(props, { attrs }) {
    const root = shallowRef<EChartsElement>()
    const chart = shallowRef<EChartsType>()
    const manualOption = shallowRef<ChartsOption>()

    // 取父类传过来的值
    const defaultTheme = inject(THEME_KEY, null)
    const defaultInitOptions = inject(
      INIT_OPTIONS_KEY,
      null
    )
    const defaultUpdateOptions = inject(
      UPDATE_OPTIONS_KEY,
      null
    )
    const {
      autoresize,
      manualUpdate,
      loading,
      loadingOptions,
      data,
      chartType,
      subChartType,
    } = toRefs(props)

    const realTheme = computed(
      () => props.theme || unwrapInjected(defaultTheme, {})
    )

    const realOption = computed(
      () => manualOption.value || props.options || null
    )
    const realInitOptions = computed(
      () =>
        props.initOptions ||
        unwrapInjected(defaultInitOptions, {})
    )
    const realUpdateOptions = computed(
      () =>
        props.updateOptions ||
        unwrapInjected(defaultUpdateOptions, {})
    )

    const nonEventAttrs = computed(() => omitOn(attrs))

    // @ts-expect-error listeners for Vue 2 compatibility
    const listeners = getCurrentInstance()?.proxy?.$listeners

    function init(option?: ChartsOption) {
      if (!root.value) {
        return
      }
      const instance = (chart.value = initChart(
        root.value,
        realTheme.value,
        realInitOptions.value
      ))
      if (props.group) {
        instance.group = props.group
      }

      useEventListener(instance, attrs, listeners)

      function resize() {
        if (instance && !instance.isDisposed()) {
          instance.resize()
        }
      }

      function commit() {
        const opt = option || realOption.value
        if (opt) {
          const newopt = build(
            data.value,
            chartType.value,
            subChartType.value
          )
          instance.setOption(
            newopt,
            realUpdateOptions.value
          )
        }
      }
      if (autoresize.value) {
        // Try to make chart fit to container in case container size
        // is changed synchronously or in already queued microtasks
        nextTick(() => {
          resize()
          commit()
        })
      } else {
        commit()
      }
    }

    function setOption(
      option: ChartsOption,
      updateOptions?: UpdateOptions
    ) {
      if (props.manualUpdate) {
        manualOption.value = option
      }

      if (!chart.value) {
        init(option)
      } else {
        chart.value.setOption(option, updateOptions || {})
      }
    }

    function cleanup() {
      if (chart.value) {
        chart.value.dispose()
        chart.value = undefined
      }
    }

    let unwatchOption: (() => void) | null = null
    watch(
      manualUpdate,
      (manualUpdate) => {
        if (typeof unwatchOption === 'function') {
          unwatchOption()
          unwatchOption = null
        }

        if (!manualUpdate) {
          unwatchOption = watch(
            () => props.options,
            (option, oldOption) => {
              if (!option) {
                return
              }
              if (!chart.value) {
                init()
              } else {
                chart.value.setOption(option, {
                  // mutating `option` will lead to `notMerge: false` and
                  // replacing it with new reference will lead to `notMerge: true`
                  notMerge: option !== oldOption,
                  ...realUpdateOptions.value,
                })
              }
            },
            { deep: true }
          )
        }
      },
      {
        immediate: true,
      }
    )

    watch(
      [realTheme, realInitOptions],
      () => {
        cleanup()
        init()
      },
      {
        deep: true,
      }
    )
    watchEffect(() => {
      if (props.group && chart.value) {
        chart.value.group = props.group
      }
    })

    watch(data, function (newval, oldval) {
      if (newval && newval.length) {
        setOption(
          build(newval, chartType.value, subChartType.value)
        )
      }
    })

    useLoading(chart, loading, loadingOptions)

    useAutoresize(chart, autoresize, root)

    const publicApi = usePublicAPI(chart)

    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => {
      if (wcRegistered && root.value) {
        // For registered web component, we can leverage the
        // `disconnectedCallback` to dispose the chart instance
        // so that we can delay the cleanup after exsiting leaving
        // transition.
        root.value.__dispose = cleanup
      } else {
        cleanup()
      }
    })

    return {
      chart,
      root,
      nonEventAttrs,
      register,
      ...publicApi,
    }
  },
  render() {
    // Vue 3 and Vue 2 have different vnode props format:
    // See https://v3-migration.vuejs.org/breaking-changes/render-function-api.html#vnode-props-format
    const attrs = { ...this.nonEventAttrs } as any
    attrs.ref = 'root'
    attrs.class = attrs.class
      ? ['echarts'].concat(attrs.class)
      : 'echarts'
    return h(TAG_NAME, attrs)
  },
})
</script>
<style>
pandora-charts {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
}
</style>
