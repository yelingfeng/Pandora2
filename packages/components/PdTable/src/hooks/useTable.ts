import { error, getDynamicProps } from '@/_utils'
import { isProdMode } from '@/_utils/env'
import { nextTick, onUnmounted, ref, unref, watch } from 'vue'
import type {
  IPandoraTableColumn,
  IPandoraTableProps,
  ITableActionType,
  UseTableReturnType
} from '../types'

type Props = Partial<IPandoraTableProps<any>>

export function useTable(props?: Props): UseTableReturnType {
  const tableRef = ref<Nullable<ITableActionType>>(null)
  const loadedRef = ref<Nullable<boolean>>(false)

  async function getTable() {
    const table = unref(tableRef)
    if (!table) {
      error(
        'The table instance has not been obtained, please make sure that the table has been rendered when performing the table operation!'
      )
    }
    await nextTick()
    return table as ITableActionType
  }

  const register = (instance: ITableActionType) => {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null
        loadedRef.value = null
      })

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) return

    tableRef.value = instance
    loadedRef.value = true

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: ITableActionType = {
    setProps: async (props: Partial<IPandoraTableProps<any>>) => {
      const table = await getTable()
      table.setProps(props)
    },
    setColumns: async (columns: IPandoraTableColumn<any>[]) => {
      const table = await getTable()
      table.setColumns(columns)
    },
    setData: async (data: any[]) => {
      const table = await getTable()
      table.setData(data)
    },
    reload: async (opt?: any) => {
      const table = await getTable()
      return table.reload(opt)
    },
    getSelectRows: <T = any>() => {
      const table = unref(tableRef) as any
      if (table && table.getSelectRows)
        return (table.getSelectRows() || []) as T[]
      return []
    },
    clearSelection: async () => {
      const table = await getTable()
      table.clearSelection()
    }
  }

  return [register, methods]
}
