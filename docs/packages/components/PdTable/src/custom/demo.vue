<template>
  <el-card class="table-card">
    <el-row>
      <YwzbTable ref="table" :data="data" :height="tableHeight" :total-row="totalRow" @summary-click="handleHeaderClick"
        @sort-change="handlerSortChange">
        <el-table-column type="expand" v-if="option.expand" align="center"></el-table-column>
        <el-table-column v-if="option.index" label="序号" type="index" width="60" align="center"
          fixed="left"></el-table-column>
        <el-table-column prop="provName" align="center" :min-width="80" label="省份" fixed="left">
          <template slot="header">
            <div class="custom-headerProve">省份</div>
          </template>
        </el-table-column>
        <el-table-column label="消息匹配率" align="center">
          <template #header>
            <span>消息匹配率（%）</span>
            <el-tooltip content="消息匹配率计算一小时平均值" placement="top">
              <i class="header-info el-icon-info"></i>
            </el-tooltip>
          </template>
          <el-table-column label="请求" :min-width="110" align="center" sortable="custom" prop="req_match_rate">
            <template #header>
              <span>请求率</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.req_match_rate" key-field="req_match_rate"
                color-field="req_match_rate_color" type-field="req_match_rate_type" :row="scope.row"
                :column="scope.column" :index="scope.$index" @click="dataClick" />
            </template>
          </el-table-column>
          <el-table-column label="响应（%）" align="center" :min-width="110" sortable="custom" prop="rsp_match_rate">
            <template #header>
              <span>响应率</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.rsp_match_rate" key-field="rsp_match_rate"
                color-field="rsp_match_rate_color" type-field="rsp_match_rate_type" :row="scope.row"
                :column="scope.column" :index="scope.$index" @click="dataClick" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="字段填充率（一小时平均值）" align="center">
          <template #header>
            <span>字段填充率（%）</span>
            <el-tooltip content="字段填充率计算一小时平均值" placement="top">
              <i class="header-info el-icon-info"></i>
            </el-tooltip>
          </template>
          <el-table-column label="IMSI" :min-width="100" align="center" sortable="custom" prop="imsi_rate">
            <template #header>
              <span>IMSI</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.imsi_rate" key-field="imsi_rate" color-field="imsi_rate_color"
                type-field="imsi_rate_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
          <el-table-column label="MSISDN" align="center" :min-width="100" sortable="custom" prop="imsisdn_rate">
            <template #header>
              <span>MSISDN</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.imsisdn_rate" key-field="imsisdn_rate" color-field="imsisdn_rate_color"
                type-field="imsisdn_rate_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
          <el-table-column label="IMEI" align="center" :min-width="100" sortable="custom" prop="imei_rate">
            <template #header>
              <span>IMEI</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.imei_rate" key-field="imei_rate" color-field="imei_rate_color"
                type-field="imei_rate_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="用户数" align="center">
          <template #header>
            <span>用户数（个）</span>
            <el-tooltip content="显示前一天累积值" placement="top">
              <i class="header-info el-icon-info"></i>
            </el-tooltip>
          </template>
          <el-table-column label="境内" :min-width="120" align="center" sortable="custom" prop="user_num">
            <template #header>
              <span>境内</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.user_num" key-field="user_num" color-field="user_num_color"
                type-field="user_num_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
          <el-table-column label="境外" align="center" :min-width="120" sortable="custom" prop="a_user_num">
            <template #header>
              <span>境外</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.a_user_num" key-field="a_user_num" color-field="a_user_num_color"
                type-field="a_user_num_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center">
          <template #header>
            <span>CDR入库情况（条）</span>
            <el-tooltip content="显示CDR数据入库一小时累积值" placement="top">
              <i class="header-info el-icon-info"></i>
            </el-tooltip>
          </template>
          <el-table-column label="CDR数量" :min-width="130" align="center" sortable="custom" prop="cdr_num">
            <template #header>
              <!-- <span @click.stop="handleHeaderClick('cdr_num')" style="cursor: pointer"> -->
              <span>CDR数量</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.cdr_num" key-field="cdr_num" color-field="cdr_num_color"
                type-field="cdr_num_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
          <el-table-column label="丢包数" align="center" :min-width="130" sortable="custom" prop="lost_num">
            <template #header>
              <span>丢包数</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.lost_num" key-field="lost_num" color-field="lost_num_color"
                type-field="lost_num_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="CDR入库情况" align="center">
          <template #header>
            <span>CDR总入库情况（条）</span>
            <el-tooltip content="显示CDR入库一天累计值" placement="top">
              <i class="header-info el-icon-info"></i>
            </el-tooltip>
          </template>
          <el-table-column label="CDR数量" :min-width="120" align="center" sortable="custom" prop="cdr_num_day">
            <template #header>
              <!-- <span @click.stop="handleHeaderClick('cdr_num')" style="cursor: pointer"> -->
              <span>CDR数量</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.cdr_num_day" key-field="cdr_num_day" color-field="cdr_num_day_color"
                type-field="cdr_num_day_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
          <el-table-column label="丢包数" align="center" :min-width="120" sortable="custom" prop="lost_num_day">
            <template #header>
              <span>丢包数</span>
            </template>
            <template slot-scope="scope">
              <RenderDataCell :value="scope.row.lost_num_day" key-field="lost_num_day" color-field="lost_num_day_color"
                type-field="lost_num_day_type" :row="scope.row" :column="scope.column" :index="scope.$index"
                @click="dataClick" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="menu" label="操作" :min-width="90" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleView(scope.row)">跳转</el-button>
          </template>
        </el-table-column>
      </YwzbTable>
    </el-row>
    <!-- <el-row> -->
    <!-- <el-pagination
            align="right"
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </el-row> -->
  </el-card>
</template>

<script>
import { provListQx } from '@/api/common/common'
import { getCharts, getList } from '@/api/qgywzb/index'
import AdvancedQueryDrawer from '@/components/common/AdvancedQuery'
import OperatorTabs from '@/components/common/OperatorTabs.vue'
import RenderDataCell from '@/components/common/RenderDataCell.vue'
import Stats from '@/components/common/Stats.vue'
import TimesTabs from '@/components/common/TimesTabs.vue'
import YwzbTable from '@/components/common/YwzbTable.vue'
import option from '@/option/hardwareStatus/equipmentResources'
import { formatNumberValueOnly, getServiceTypeName } from '@/util/biz'
import TableScreenshot from '@/util/screenshot'
import { getDefaultTimeValues, getExportData } from '@/util/util'
import dayjs from 'dayjs'
import { mapActions, mapGetters } from 'vuex'
import EquipmentDialog from './components/EquipmentDialog'
import LineCharts from './components/LineCharts'
export default {
  data() {
    const { endTime } = getDefaultTimeValues(1)
    return {
      colData: [],
      showDrawer: false,
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: true,
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      isShowLostNum: true,
      preDis: false,
      selectedRange: 1,
      tableHeight: 350,
      // 查询信息
      query: {
        startTime: '',
        endTime,
        isp: '',
        timeFlag: 1,
        provId: '',
        orderFile: 'cdr_num',
        orderType: 'desc',
      },
      queryDialog: {
        startTime: '',
        endTime: '',
        provId: '',
      },
      // 表单列表
      data: [],
      // 表单配置
      option: option,
      importVisible: false,
      importForm: {
        center_name: '',
        center_code: '',
        operator: '',
      },
      // pathFun: importFile,
      reload: null,
      lineData: [],
      provArr: [],
      lineParame: {},
      lineOpt: {
        colors: ['#669AFF', '#77DEA0', '#fe9a8b'],
        clickType: '',
        unit: '%',
      },
      cdrDataArr: [],
      statList: [
        { label: '总cdr数（条）', value: 0, icon: 'el-icon-data-line' },
        { label: '总用户数', value: 0, icon: 'el-icon-data-line' },
      ],
      // 汇总行来源：首行数据
      totalRow: null,
      // 汇总行各列对应的prop索引映射（index -> prop）
      summaryPropIndexMap: [],
      // 汇总行点击事件委托处理器（单次绑定）
      summaryDelegateHandler: null,
      showColumn: false,
      // 分页信息
      page: {
        currentPage: '',
        pageSize: '',
        total: '',
      },
      chartVisible: false,
      curRow: {},
      // 添加缺失的属性
      dialogVisible: false,
      currentEquipment: {},
      // 选中行的索引
      selectedRowIndex: -1,

      timeFlagOptions: [
        {
          label: '近一天',
          value: 1,
          desc: '一天',
          days: 1,
        },
        {
          label: '近一周',
          value: 7,
          desc: '一周',
          days: 7,
        },
        {
          label: '近一月',
          value: 30,
          desc: '一月',
          days: 30,
        },
      ],

      timeList: [
        {
          label: '近一周',
          value: 7,
          desc: '最近7天',
          days: 7,
        },
        {
          label: '近两周',
          value: 14,
          desc: '最近14天',
          days: 14,
        },
        {
          label: '近一个月',
          value: 30,
          desc: '最近30天',
          days: 30,
        },
        {
          label: '近一个季度',
          value: 90,
          desc: '最近90天',
          days: 90,
        },
      ],
      curCellNameMap: {
        cdr_num_day: 'cdr总入库数量（一天）',
        cdr_num: 'cdr入库数量（一小时）',
        lost_num: 'cdr丢包数（一小时）',
        lost_num_day: 'cdr丢包数（一天）',
        req_match_rate: '消息匹配率-请求率',
        rsp_match_rate: '消息匹配率-响应率',
        imsi_rate: 'IMSI填充率',
        imsisdn_rate: 'MSISDN填充率',
        imei_rate: 'IMEI填充率',
        user_num: '境内用户数',
        a_user_num: '境外用户数',
      },
    }
  },
  components: { Stats, LineCharts, AdvancedQueryDrawer, EquipmentDialog, TimesTabs, OperatorTabs, YwzbTable, RenderDataCell },
  created() {
    if (this.isNativeCenter) {
      this.query.centerId = this.curOrgCode
    }
  },
  mounted() {
    this.init()
    this.getDicData()
    // 初始化后进行一次布局刷新，避免汇总行/固定列在初始宽度计算前产生错位
    this.$nextTick(() => {
      this.reflowTable()
      // 延迟进行首次高度计算，确保表单和其他元素完全渲染
      setTimeout(() => {
        this.calcTableHeight()
      }, 200)
    })
    // 监听窗口尺寸变化，动态刷新表格布局
    window.addEventListener('resize', this.handleResize)
  },
  watch: {
    // 数据源变更后重新布局（包括异步加载/筛选结果）
    data() {
      this.reflowTable()
      // 数据变化后也需要重新计算表格高度
      this.$nextTick(() => {
        this.calcTableHeight()
      })
    },
    // 表格高度变化（例如容器尺寸改变或外部布局变更）时重新布局
    tableHeight() {
      this.reflowTable()
    },
    // 监听侧边栏收起状态，重新计算表格高度
    isCollapse() {
      this.$nextTick(() => {
        this.calcTableHeight()
      })
    },
  },
  computed: {
    ...mapGetters(['permission', 'subCenterList', 'operateList', 'isNativeCenter', 'curOrgCode', 'isCollapse', 'currentSysId']),
    headerTitle() {
      const prop = (this.lineParame && this.lineParame.file) || ''
      return `${this.curCellNameMap[prop]} 趋势信息`
    },
  },
  methods: {
    ...mapActions(['loadBizAdvanceQueryData']),
    formatNumberValueOnly,

    init() {
      this.$store.dispatch('setCurProvCode', { provCode: 'all' })
      this.loadBizAdvanceQueryData('device_res_userage')
      this.onLoad()
      window.addEventListener('resize', this.handleResize)
    },

    // 处理导出下拉菜单命令
    handleExportCommand(command) {
      if (command === 'excel') {
        this.exportAction()
      } else if (command === 'screenshot') {
        this.exportScreenshot()
      }
    },
    // 刷新 Element Table 的布局与宽度计算
    reflowTable() {
      this.$nextTick(() => {
        const tableComp = this.$refs && this.$refs.table
        const elTable = tableComp && typeof tableComp.getTableRef === 'function' ? tableComp.getTableRef() : null
        if (elTable && typeof elTable.doLayout === 'function') {
          elTable.doLayout()
        }
      })
    },
    // 窗口尺寸变更时触发表格重新布局与高度计算
    handleResize() {
      this.reflowTable()
      this.calcTableHeight()
    },
    dataClick(row, colunm) {
      const { startTime, endTime } = getDefaultTimeValues(7)
      this.queryDialog.startTime = startTime
      this.queryDialog.endTime = endTime
      this.queryDialog.provId = row.provid
      let par = Object.assign({}, { file: colunm.property }, this.queryDialog)
      this.chartVisible = true
      this.selectedRange = 1
      this.lineParame = Object.assign({}, this.query, par)
      if (
        colunm.property === 'cdr_num' ||
        colunm.property === 'lost_num' ||
        colunm.property === 'lost_num_day' ||
        colunm.property === 'cdr_num_day'
      ) {
        this.lineOpt.clickType = '1'
      } else if (colunm.property === 'user_num' || colunm.property === 'a_user_num') {
        this.lineOpt.clickType = '2'
      } else {
        this.lineOpt.clickType = ''
      }
      this.handleGetLineData()
    },
    handleHeaderClick(prop) {
      const { startTime, endTime } = getDefaultTimeValues(7)
      this.queryDialog.startTime = startTime
      this.queryDialog.endTime = endTime
      this.queryDialog.provId = ''
      let par = Object.assign({}, { file: prop }, this.queryDialog)
      this.chartVisible = true
      this.selectedRange = 1
      this.lineParame = Object.assign({}, this.query, par)
      if (prop === 'cdr_num' || prop === 'lost_num' || prop === 'lost_num_day' || prop === 'cdr_num_day') {
        this.lineOpt.clickType = '1'
      } else if (prop === 'user_num' || prop === 'a_user_num') {
        this.lineOpt.clickType = '2'
      } else {
        this.lineOpt.clickType = ''
      }
      // this.headerTitle = this.removeParenthesesContent(column.column.label)
      this.handleGetLineData()
    },
    removeParenthesesContent(str) {
      if (!str) return []
      // 匹配所有括号及内容，包括括号
      const regex = /\([^)]*\)/g
      return str.match(regex) || []
    },
    getDicData() {
      // 省份
      provListQx({}).then((res) => {
        this.provArr = res.data.data
      })
    },
    advancedChange() {
      this.showDrawer = true
    },
    handleQuery(val) {
      console.log('高级查询返回参数--->', val)
      this.query.curQuery = JSON.stringify({ arr: val })
      this.onLoad()
    },

    searchHide() {
      this.search = !this.search
    },
    columnHide() {
      this.showColumn = !this.showColumn
    },
    searchChange() {
      this.onLoad()
    },
    searchReset() {
      const { endTime } = getDefaultTimeValues(1)
      this.query = {
        startTime: '',
        endTime,
        timeFlag: 1,
        isp: '',
        type: '',
        provId: '',
      }
      this.$refs.advance.handleReset()
      this.onLoad()
    },
    searchDialogChange() {
      this.lineParame.startTime = this.queryDialog.startTime
      this.lineParame.endTime = this.queryDialog.endTime
      this.handleGetLineData()
    },
    searchDailogReset() {
      const { startTime, endTime } = getDefaultTimeValues(7)
      this.queryDialog = {
        startTime,
        endTime,
      }
      this.lineParame.startTime = startTime
      this.lineParame.endTime = endTime
      this.selectedRange = 1
      this.handleGetLineData()
    },
    handleTimeChange(range) {
      const { startTime, endTime } = range
      this.queryDialog.startTime = startTime
      this.queryDialog.endTime = endTime
      this.lineParame.startTime = this.queryDialog.startTime
      this.lineParame.endTime = this.queryDialog.endTime
      this.handleGetLineData()
    },

    handleTimeFlagChange() {
      // const timeType = option.days
      this.onLoad()
    },

    handleOperatorChange(value, option) {
      if (value.value === '') {
        this.isShowLostNum = true
      } else {
        this.isShowLostNum = false
      }
      console.log('运营商选择变更:', value, option)
      this.onLoad()
    },
    calcTableHeight() {
      this.$nextTick(() => {
        // 等待DOM更新完成后再计算
        setTimeout(() => {
          const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
          const tableCard = document.querySelector('.table-card')
          const cardTop = tableCard ? tableCard.offsetTop : 0

          // 菜单高度和其他固定元素高度
          const menuHeight = 40
          const paddingHeight = 20 // 减少内边距，之前30px太大了
          const headerOffset = 30 // 减少头部偏移量

          // 基础计算：视窗高度 - 表格卡片顶部位置 - 菜单高度 - 内边距 - 头部偏移
          // 注意：cardTop已经包含了表单卡片的高度，所以不需要再减去formHeight
          let resultHeight = clientHeight - cardTop - menuHeight - paddingHeight - headerOffset
          // 增加延迟到150ms
          this.tableHeight = Math.max(resultHeight, 200)
          // 增加延迟到150ms
        }, 150)
      })
    },

    // 获取表单区域的动态高度
    getFormHeight() {
      const formElement = document.querySelector('.custom-formInline.single-row')
      if (formElement) {
        // 强制重新计算布局
        formElement.offsetHeight

        // 获取表单的实际渲染高度，包括换行后的高度
        const computedStyle = window.getComputedStyle(formElement)
        const height = formElement.offsetHeight
        const marginTop = parseInt(computedStyle.marginTop) || 0
        const marginBottom = parseInt(computedStyle.marginBottom) || 0
        const paddingTop = parseInt(computedStyle.paddingTop) || 0
        const paddingBottom = parseInt(computedStyle.paddingBottom) || 0

        // 计算总高度，包括所有间距
        const totalHeight = height + marginTop + marginBottom + paddingTop + paddingBottom

        console.log(
          'getFormHeight - Found form element, offsetHeight:',
          height,
          'margins:',
          marginTop + marginBottom,
          'paddings:',
          paddingTop + paddingBottom,
          'total:',
          totalHeight
        )

        return totalHeight
      }

      // 如果找不到表单元素，根据侧边栏状态返回估算值
      const estimatedHeight = this.isCollapse ? 80 : 120 // 增加估算值，更接近实际情况
      console.log('getFormHeight - Form element not found, using estimated height:', estimatedHeight, 'isCollapse:', this.isCollapse)
      return estimatedHeight
    },
    handleImport() {
      // 导入功能
      this.importVisible = true
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
      this.onLoad()
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.onLoad()
    },
    handleTableChange(row) {
      let isp = ''
      if (row.isp == '中国联通') {
        isp = 1
      } else if (row.isp == '中国移动') {
        isp = 0
      } else if (row.isp == '中国电信') {
        isp = 3
      }
      this.query.isp = isp
      // this.query.ip_address = row.ipAddress
      // this.query.provinceId = row.provId
      // this.handleGetLineData()
    },

    formatStatusFiirewall(status) {
      if (status === 0) {
        return `开启`
      } else if (status === 1) {
        return `关闭`
      } else {
        return `未知`
      }
    },
    setHeaderStyle(row) {
      // 第二列索引为1（从0开始计数）
      if (row.column.property === 'proName') {
        return { cursor: 'auto !important;' } // 浅蓝色背景
      }
    },
    /**
     * 防火墙状态判断
     * @param status
     */
    formatStatusNet(status) {
      if (status === 0) {
        return `正常`
      } else if (status === 1) {
        return `告警`
      } else if (status === 2) {
        return `未知`
      } else {
        return `-`
      }
    },

    formatServiceType(type) {
      return getServiceTypeName(this.$store.getters.serviceTypeList, type)
    },

    handlerSortChange({ orderFile, orderType }) {
      console.log(orderFile, orderType)
      this.query.orderFile = orderFile
      this.query.orderType = orderType
      this.onLoad()
    },

    onLoad() {
      this.data = []
      getList(this.page.currentPage, this.page.pageSize, this.query).then((res) => {
        if (res && res.data && res.data.data && Object.keys(res.data.data).length > 0) {
          const data = res.data.data
          this.page.total = data.total
          // 取第一条为汇总数据，其余渲染
          const list = Array.isArray(data.list) ? data.list : []
          this.totalRow = list.length ? list[0] : null
          this.data = list.length > 1 ? list.slice(1) : []
          // if (data.static) {
          //   const { cdr_num, user_num } = data.static[0]
          //   this.statList = [
          //     { label: '总cdr数（条）', value: cdr_num || 0, icon: 'el-icon-data-line' },
          //     { label: '总用户数', value: user_num || 0, icon: 'el-icon-data-line' },
          //   ]
          // } else {
          //   this.initStats()
          // }
        } else {
          this.data = []
          this.page.total = 0
          this.page.currentPage = 1
          // this.initStats()
        }

        this.loading = false

        // 数据加载完成后重新计算表格高度
        this.$nextTick(() => {
          this.calcTableHeight()
        })
      })
    },
    initStats() {
      this.statList = [
        { label: '总cdr数（条）', value: 0, icon: 'el-icon-data-line' },
        { label: '总用户数', value: 0, icon: 'el-icon-data-line' },
      ]
    },
    handleGetLineData() {
      const loadingInstance = this.$loading({
        lock: true,
        text: '加载数据中...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.6)',
      })
      getCharts(this.lineParame).then((res) => {
        const data = res.data.data
        if (data.length) {
          this.lineData = data.map((it) => {
            return {
              name: it.name,
              value: it.value,
              category: it.category,
            }
          })
        } else {
          this.lineData = []
        }
        loadingInstance.close()
      })
    },
    // 列筛选
    handleChangeColumn(columns, checkBoxGroup) {
      let arr = checkBoxGroup.filter((i) => !columns.includes(i))
      this.colData.filter((i) => {
        if (arr.indexOf(i.title) != -1) {
          i.istrue = false
        } else {
          i.istrue = true
        }
      })
      this.reload = Math.random()
    },
    /**
     * 导出
     */
    exportAction() {
      const fileName = '业务指标情况数据' + dayjs().format('YYYYMMDDHHmm') + '.csv'
      let downloadUrl = `/magic-api/qg_home/tz/business_indicator_export`
      getExportData(this, downloadUrl, fileName)
    },

    /**
     * 导出界面截图
     */
    async exportScreenshot() {
      await TableScreenshot.exportTableScreenshot({
        tableRef: this.$refs.table,
        loadingInstance: this.$loading,
        messageInstance: this.$message,
        nextTick: this.$nextTick,
        filename: '业务指标表格完整数据',
      })
    },

    handleChart(row) {
      this.chartVisible = true
      console.log('当前行操作数据->>>', row)
      this.$nextTick(() => {
        this.curRow = Object.assign({}, row)
      })
    },

    handleClose() {
      this.chartVisible = false
    },
    formatDateCb(startTime) {
      return startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
    taskSuccessCls(status) {
      if (status === 0) {
        return 'vab-dot-success'
      } else {
        return 'vab-dot-error'
      }
    },
    // 添加缺失的handleView方法
    handleView(row) {
      console.log('切换省份代码:', row)
      // 这里可以根据行数据中的省份信息进行相应的操作
      // 例如：设置当前省份代码到store或进行其他业务逻辑
      const params = {
        initId: '',
        routePath: this.$route.path,
        sysFlage: this.currentSysId,
        jumpType: '1',
      }
      // 先加载跳转后端控制逻辑
      this.$store.dispatch('loadJumpRouter', params).then((res) => {
        const { path, topMenuId } = res

        console.log('全国信令调整 目标routepath->', path, res)
        if (row.provid) {
          this.$store
            .dispatch('setCurRoute', { targetRoute: path, topMenuId })
            .then(() => {
              // 调用store中的方法来设置当前省份代码，并传递路由信息
              this.$store
                .dispatch('setCurProvCode', {
                  provCode: row.provid,
                  router: this.$router,
                  targetRoute: path,
                })
                .then(() => {
                  this.$store.dispatch('GetTopMenu').then(() => {
                    // 或者直接访问父组件的方法（如果可以访问到）
                    const topMenuComponent = this.$parent.$refs && this.$parent.$refs.top.$refs
                    if (topMenuComponent && topMenuComponent.topMenu.refreshActiveMenu) {
                      topMenuComponent.topMenu.refreshActiveMenu()
                    }
                  })
                  console.log(`已切换到省份：${row.provName}`)
                })
                .catch((err) => {
                  console.error('切换省份失败:', err)
                })
            })
            .catch((err) => {
              console.error('切换省份失败:', err)
            })
        } else {
          console.warning('该行数据缺少省份代码信息')
        }
      })
    },

    // getSummaries(param) {
    //   const { columns, data } = param
    //   console.log('columns', columns)
    //   console.log('data', data)
    //   const sums = []
    //   // 计算前置列数量（展开列、序号列），将“综合”放在其后的第一列，前置列留空以实现视觉跨两列效果
    //   const leadingCount = (this.option && this.option.expand ? 1 : 0) + (this.option && this.option.index ? 1 : 0)
    //   const labelIndex = leadingCount // 在前置列之后的第一列展示“综合”

    //   const NUM_FORMAT_PROPS = new Set(['cdr_num', 'lost_num', 'cdr_num_day', 'lost_num_day', 'user_num', 'a_user_num'])

    //   columns.forEach((column, index) => {
    //     const prop = column.property

    //     // 前置列（展开、序号）留空，避免显示 N/A
    //     if (index < labelIndex) {
    //       sums[index] = ''
    //       return
    //     }

    //     // 在前置列后的第一列显示“综合”
    //     if (index === labelIndex) {
    //       sums[index] = '综合'
    //       return
    //     }

    //     if (!prop) {
    //       sums[index] = ''
    //       return
    //     }

    //     // 使用totalRow作为汇总数据来源
    //     const source = this.totalRow || (data && data.length ? data[0] : {})
    //     const typeKey = `${prop}_type`
    //     const unit = this.getUnit(source[typeKey], 0)

    //     if (typeof source[prop] !== 'undefined' && source[prop] !== null && source[prop] !== '') {
    //       let valueStr = ''
    //       if (NUM_FORMAT_PROPS.has(prop)) {
    //         valueStr = this.formatNumberValueOnly(source[prop], 2)
    //       } else {
    //         valueStr = String(source[prop])
    //       }

    //       if (source[prop] > 0) {
    //         sums[index] = `${valueStr}${unit}`
    //       } else {
    //         sums[index] = valueStr
    //       }
    //     } else {
    //       sums[index] = ''
    //     }
    //   })

    //   return sums
    // },
    // 汇总单元的单位生成（沿用父组件规则）
    getUnit(value, index) {
      if (index === 0 && value) {
        return '（' + value + '）'
      } else {
        return ''
      }
    },
    // 添加处理从弹窗显示趋势图的方法
    handleShowChart(equipmentData) {
      this.handleChart(equipmentData)
    },
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize)
    }
    // const tableComp = this.$refs && this.$refs.table
    // const elTable = tableComp && typeof tableComp.getTableRef === 'function' ? tableComp.getTableRef() : null
    // const tableEl = elTable && elTable.$el
    // if (tableEl && this.summaryDelegateHandler) {
    //   tableEl.removeEventListener('click', this.summaryDelegateHandler, true)
    //   this.summaryDelegateHandler = null
    // }
  },
}
</script>

<style lang="scss" scoped></style>
