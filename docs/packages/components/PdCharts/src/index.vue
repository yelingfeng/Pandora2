<script lang="tsx">
import { init as initChart } from 'echarts'
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect,
  type InjectionKey
} from 'vue'
import type {
  ChartsActionType,
  ChartsOption,
  ChartsProps,
  EChartsType,
  InitOptionsInjection,
  ThemeInjection,
  UpdateOptions,
  UpdateOptionsInjection
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
  name: 'Charts',
  inheritAttrs: false,
  props: defaultProps,
  emits: ['register'],
  setup(props, { attrs, emit }) {
    const root = shallowRef<EChartsElement>()
    const chart = shallowRef<EChartsType>()
    const manualOption = shallowRef<ChartsOption>()
    const innerProps = ref<Partial<ChartsProps>>({})

    const getProps = computed(() => {
      return { ...props, ...innerProps.value }
    })

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

    const autoresize = computed(() => getProps.value.autoresize)
    const manualUpdate = computed(() => getProps.value.manualUpdate)
    const loading = computed(() => getProps.value.loading)
    const loadingOptions = computed(() => getProps.value.loadingOptions)
    const data = computed(() => getProps.value.data)
    const chartType = computed(() => getProps.value.chartType)
    const subChartType = computed(() => getProps.value.subChartType)
    const chartConfig = computed(() => getProps.value.chartConfig)

    const realTheme = computed(
      () => getProps.value.theme || unwrapInjected(defaultTheme, {})
    )

    const realOption = computed(
      () => manualOption.value || getProps.value.options || null
    )
    const realInitOptions = computed(
      () =>
        getProps.value.initOptions ||
        unwrapInjected(defaultInitOptions, {})
    )
    const realUpdateOptions = computed(
      () =>
        getProps.value.updateOptions ||
        unwrapInjected(defaultUpdateOptions, {})
    )

    const nonEventAttrs = computed(() => omitOn(attrs))

    function init(option?: ChartsOption) {
      if (!root.value) {
        return
      }
      const instance = (chart.value = initChart(
        root.value,
        realTheme.value,
        realInitOptions.value
      ) as unknown as EChartsType)
      if (getProps.value.group) {
        instance.group = getProps.value.group
      }

      useEventListener(instance, attrs, undefined)

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
            chartType.value as any,
            subChartType.value as any,
            chartConfig.value as any
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
      if (getProps.value.manualUpdate) {
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
      (val: any) => {
        if (typeof unwatchOption === 'function') {
          unwatchOption()
          unwatchOption = null
        }
        if (!val) {
          unwatchOption = watch(
            () => getProps.value.options as any,
            (option: any, oldOption: any) => {
              if (!option) return
              if (!chart.value) {
                init()
              } else {
                chart.value.setOption(option, {
                  notMerge: option !== oldOption,
                  ...realUpdateOptions.value,
                })
              }
            },
            { deep: true }
          )
        }
      },
      { immediate: true }
    )

    watch([realTheme, realInitOptions], () => {
      cleanup()
      init()
    }, { deep: true })

    watchEffect(() => {
      if (getProps.value.group && chart.value) {
        chart.value.group = getProps.value.group
      }
    })

    watch(data, (newval: any) => {
      if (newval && newval.length) {
        setOption(build(newval, chartType.value as any, subChartType.value as any, chartConfig.value as any))
      }
    })

    watch(chartConfig, () => {
      if (data.value && data.value.length) {
        setOption(build(data.value, chartType.value as any, subChartType.value as any, chartConfig.value as any))
      }
    }, { deep: true })

    useLoading(chart, (computed(() => !!loading.value) as unknown) as any, loadingOptions as any)
    useAutoresize(chart, autoresize as any, root as any)

    const publicApi = usePublicAPI(chart)

    function setProps(props: Partial<ChartsProps>) {
      innerProps.value = { ...innerProps.value, ...props }
    }

    const instance: ChartsActionType = {
      setProps,
      setOptions: setOption,
      resize: () => chart.value?.resize(),
      getInstance: () => chart.value,
      showLoading: (type, opts) => chart.value?.showLoading(type, opts),
      hideLoading: () => chart.value?.hideLoading(),
      clear: () => chart.value?.clear(),
      dispose: () => chart.value?.dispose()
    }

    onMounted(() => {
      init()
      emit('register', instance)
    })

    onBeforeUnmount(() => {
      if (wcRegistered && root.value) {
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
    const attrs = { ...this.nonEventAttrs } as any
    attrs.ref = 'root'
    attrs.class = attrs.class
      ? ['echarts'].concat(attrs.class)
      : 'echarts'
    return <TAG_NAME {...attrs} />
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
