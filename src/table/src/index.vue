<script lang="tsx">
import { defineComponent, PropType } from "vue";
import { createNamespace } from "../../_utils/create";
import { propTypes } from "../../_utils/propTypes";
import { ElTable, ElTableColumn } from "element-plus";
import { TableColumnCtx } from "element-plus/packages/table/src/table-column/defaults";
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
 * 挂载的组件
 */
const defineMountedComponents = () => {
  return {
    components: {
      ElTable,
      ElTableColumn,
    },
  };
};
/**
 * 定义属性
 */
const definePropsCfg = () => {
  return {
    props: {
      rowsData: propTypes.array,
      columns: Array as PropType<Partial<TableColumnCtx<unknown>>>,
    },
  };
};

const defineSetup = () => {
  return {
    setup(props) {
      const tableData = props.rowsData;
      const columnProps = props.columns as TableColumnCtx<unknown>[];
      const columns = columnProps.map((item) => {
        const columnProps = {
          prop: item.prop,
          label: item.label,
          width: item.width,
        };
        return <ElTableColumn {...columnProps}></ElTableColumn>;
      });
      return () => {
        return <ElTable data={tableData}>{columns}</ElTable>;
      };
    },
  };
};

const config = {
  ...defineBaseCompCfg("VTable"),
  ...definePropsCfg(),
  ...defineMountedComponents(),
  ...defineSetup(),
};
export default defineComponent(config);
</script>
