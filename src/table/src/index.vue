<script lang="tsx">
import {
  defineComponent,
  PropType,
  toRaw,
  ref,
  Ref,
  toRefs,
  onMounted,
  watch,
} from "vue";
import { createNamespace } from "../../_utils/create";
import { propTypes } from "../../_utils/propTypes";
import { ElTable, ElTableColumn } from "element-plus";
import type { TableColumnCtx } from "element-plus/packages/table/src/table-column/defaults";
import type { TableProps, Table } from "element-plus/packages/table/src/table/defaults";
import { IPandoraTableSort, ISortChangeCb, SortService } from "./sortService";
import Pagination from "./pagination.vue";

interface IPageOpt {
  // 分页高度
  height?: number;
  // 当前页
  currentPage?: number;
  // 总数
  total?: number;
  // 每页显示条数选择数组
  pageSizes?: number[];
  // 最大页码按钮数
  pageCount?: number;
  // 当前显示每页条数
  pageSize?: number;
  // 分页功能 默认显示完整功能 （可不传）
  layout?: string;
}

interface IPandoraTable<T> extends TableProps<T> {
  // 是否隔行变色
  stripe?: boolean;
  // 是否显示表头
  isHeader?: boolean;
  // 高亮当前行
  highlightCurrentRow?: boolean;
  // 选择模式 单选还是多选
  selectionMode?: string;
  // 复现框的位置 前后 top 和 end
  selectionPos?: string;
  // 是否显示多选
  selection?: boolean;
  // 是否可选中的回调
  selectable?: (row: T, index: number) => void;
  // 排序模式
  sortMode?: string;
  // 行点击事件
  rowClick?: (row: object, column: object, event: any) => void;
  // 排序事件
  sortChange?: (column: object) => void;
  // 行改变事件
  rowChange?: (row: object, index: number) => void;
  // 是否分页
  pagination: boolean;
  // 排序
  defaultSort?: object[];
  // 默认排序方向
  defaultOrder?: string;
  // 分页参数
  pageOpt: IPageOpt;
}

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

const PAGE_HEIGHT = 50;
const defaultOption: IPageOpt = {
  height: PAGE_HEIGHT,
  currentPage: 1,
  total: 0,
  pageCount: 7,
  pageSizes: [10, 20, 30, 40, 50],
  pageSize: 10,
};

const [name] = createNamespace("VTable");
export default defineComponent({
  name,
  inheritAttrs: false,
  props: {
    sortConfig: Object as PropType<IPandoraTableSort<unknown>>,
    tableConfig: Object as PropType<Partial<IPandoraTable<unknown>>>,
    data: propTypes.array,
    columns: Array as PropType<Partial<IPandoraTableColumn<unknown>>>,
  },
  components: {
    Pagination,
    ElTable,
    ElTableColumn,
  },
  setup(props, { emit }) {
    const tableInstance = ref<Table<unknown>>();
    const columnProps = toRaw(props.columns) as IPandoraTableColumn<unknown>[];
    const sortConfig = toRaw(props.sortConfig) as IPandoraTableSort<ISortChangeCb>;
    const $sortService = useSort(sortConfig, columnProps, tableInstance);
    // const rowData = toRefs(props.data);

    const tableConfig = toRaw(props.tableConfig) as IPandoraTable<unknown>;
    onMounted(() => {
      $sortService.init();
    });

    watch(
      () => props.data,
      (newVal, oldVal) => {
        // rowData.value = toRaw(newVal);
        tableConfig.data = newVal;
        $sortService.initIconSort();
      },
      {
        deep: true,
      }
    );

    const handleHeaderClick = (column: any, e: any) => {
      $sortService.executeHeaderClick(column, e);
    };

    // 分页事件回调
    const handleSizeChange = (val: number) => {
      emit("handleSizePageChange", val);
    };
    // 分页事件回调
    const handleCurrentChange = (val: number) => {
      emit("handleCurrentPageChange", val);
    };

    const columns = columnProps.map((item) => {
      const { columnProps, slots } = renderColumnProp(item, $sortService);
      if (slots && slots.header) {
        return <ElTableColumn {...columnProps}>{slots}</ElTableColumn>;
      } else {
        return <ElTableColumn {...columnProps}></ElTableColumn>;
      }
    });
    const tablePropsConfig = {
      ref: tableInstance,
      data: toRefs(props.data),
    };

    const pageRef = ref(null);
    const PagerProps = {
      ref: pageRef,
      option: tableConfig.pageOpt || defaultOption,
    };
    let PageDom: any = null;
    if (tableConfig.pagination) {
      PageDom = (
        <Pagination
          {...PagerProps}
          onHandleSizeChange={handleSizeChange}
          onHandleCurrentChange={handleCurrentChange}
        ></Pagination>
      );
    }

    return () => {
      return (
        <div class="vpandora-table">
          // @ts-ignore
          <ElTable {...tablePropsConfig} onHeaderClick={handleHeaderClick}>
            {columns}
          </ElTable>
          {PageDom}
        </div>
      );
    };
  },
});
</script>
