<script lang="tsx">
import { defineComponent, PropType, toRaw, ref, Ref, onMounted } from "vue";
import { createNamespace } from "../../_utils/create";
import { propTypes } from "../../_utils/propTypes";
import { ElTable, ElTableColumn } from "element-plus";
import type { TableColumnCtx } from "element-plus/packages/table/src/table-column/defaults";
import type { TableProps, Table } from "element-plus/packages/table/src/table/defaults";
import { IPandoraTableSort, ISortChangeCb, SortService } from "./sortService";

interface IPandoraTable<T> extends TableProps<T> {}

// 定义列接口
interface IPandoraTableColumn<T> extends TableColumnCtx<T> {
  name: string;
  value: string;
}

const useSort = (
  sortConfig: IPandoraTableSort<ISortChangeCb>,
  columns: IPandoraTableColumn<unknown>[],
  tableInstance: Ref<Table<unknown>>
) => {
  /**
   * 获取默认配置sortable = true的列 对应的order属性
   * （ 列里定义的sortable=true ）
   * return {object}
   */
  const initDefaultOrderColumn = () => {
    const obj = Object.create([]);
    columns.map((item: any) => {
      // 配置了开启排序模式
      if (item.sortable && item.sortable !== undefined) {
        obj[item.value] = "";
      }
    });
    return obj;
  };
  sortConfig.userColumnOrder = initDefaultOrderColumn();
  sortConfig.tableInstance = tableInstance;
  const sortService = new SortService(sortConfig);
  return sortService;
};

/**
 * 基础组件 属性配置
 * 封装不变的一些固定配置
 */
const defineBaseCompCfg = (n: string) => {
  const [name] = createNamespace(n);
  return {
    name,
    inheritAttrs: false,
  };
};

/**
 *
 */
const renderColumnProp = (item: IPandoraTableColumn<unknown>, $sortService: any) => {
  const { prop, value, label, name, sortable, ...others } = item;
  // 兼容处理1.0的属性
  const columnProps: any = {
    prop: item.prop || item.value,
    label: item.label || item.name,
    ...others,
  };
  let slots;
  if (sortable) {
    slots = {
      header: (props: any) => {
        const column = props.column;
        const customHeader = (
          <div relId={column.property}>
            {column.label}
            <span class="caret-wrapper">
              <i
                class="sort-caret ascending"
                on-click={(e: any) => $sortService.sortIconClick(e, column, "ascending")}
              ></i>
              <i
                class="sort-caret descending"
                on-click={(e: any) => $sortService.sortIconClick(e, column, "descending")}
              ></i>
            </span>
          </div>
        );
        return customHeader;
      },
    };
  }
  return { columnProps, slots };
};

export default defineComponent({
  ...defineBaseCompCfg("VTable"),
  props: {
    sortConfig: Object as PropType<IPandoraTableSort<unknown>>,
    tableConfig: Object as PropType<IPandoraTable<unknown>>,
    data: propTypes.array,
    columns: Array as PropType<Partial<IPandoraTableColumn<unknown>>>,
  },
  components: {
    ElTable,
    ElTableColumn,
  },
  setup(props) {
    const tableInstance = ref<Table<unknown>>(null);
    const tableData = props.data;
    const columnProps = props.columns as IPandoraTableColumn<unknown>[];

    const sortConfig = toRaw(props.sortConfig) as IPandoraTableSort<ISortChangeCb>;

    const $sortService = useSort(sortConfig, columnProps, tableInstance);

    onMounted(() => {
      $sortService.init();
    });

    const columns = columnProps.map((item) => {
      const { columnProps, slots } = renderColumnProp(item, $sortService);
      if (slots && slots.header) {
        return <ElTableColumn {...columnProps}>{slots}</ElTableColumn>;
      } else {
        return <ElTableColumn {...columnProps}></ElTableColumn>;
      }
    });
    const tableConfig = {
      ref: tableInstance,
      data: tableData,
    };

    return () => {
      return <ElTable {...tableConfig}>{columns}</ElTable>;
    };
  },
});
</script>
