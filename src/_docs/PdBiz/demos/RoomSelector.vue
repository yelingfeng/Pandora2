<template>
  <div class="demo-container">
    <h2>RoomSelector 机房选择器</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <div style="width: 300px;">
        <PdBizRoomSelector
          v-model="selectedRoom1"
          :roomList="roomList"
          @change="handleChange1"
        />
      </div>
      <p class="result">选中机房: <span>{{ selectedRoom1 }}</span></p>
    </div>

    <div class="demo-section">
      <h3>按运营商筛选</h3>
      <div style="margin-bottom: 10px;">
        <el-radio-group v-model="currentIsp">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="1">移动</el-radio-button>
          <el-radio-button label="2">联通</el-radio-button>
          <el-radio-button label="3">电信</el-radio-button>
        </el-radio-group>
      </div>
      <div style="width: 300px;">
        <PdBizRoomSelector
          v-model="selectedRoom2"
          :roomList="filteredRooms"
          placeholder="请选择机房"
          @change="handleChange2"
        />
      </div>
      <p class="result">选中机房: <span>{{ selectedRoom2 }}</span></p>
    </div>

    <div class="demo-section">
      <h3>可搜索</h3>
      <div style="width: 300px;">
        <PdBizRoomSelector
          v-model="selectedRoom3"
          :roomList="roomList"
          placeholder="输入机房名称或编码搜索"
          @change="handleChange3"
        />
      </div>
      <p class="result">选中机房: <span>{{ selectedRoom3 }}</span></p>
    </div>

    <div class="demo-section">
      <h3>异步加载数据</h3>
      <div style="margin-bottom: 10px;">
        <el-radio-group v-model="asyncIsp">
          <el-radio-button label="">请选择运营商</el-radio-button>
          <el-radio-button label="1">移动</el-radio-button>
          <el-radio-button label="2">联通</el-radio-button>
          <el-radio-button label="3">电信</el-radio-button>
        </el-radio-group>
      </div>
      <div style="width: 300px;">
        <PdBizRoomSelector
          v-model="selectedRoom4"
          :isp="asyncIsp"
          :roomList="asyncRoomList"
          placeholder="选择运营商后加载机房"
          @load-data="handleLoadData"
          @change="handleChange4"
        />
      </div>
      <p class="result">选中机房: <span>{{ selectedRoom4 }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PdBizRoomSelector } from '@pandora/components/PdBiz'
import type { IRoomItem } from '@pandora/components/PdBiz'

const selectedRoom1 = ref('')
const selectedRoom2 = ref('')
const selectedRoom3 = ref('')
const selectedRoom4 = ref('')
const currentIsp = ref('')
const asyncIsp = ref('')
const asyncRoomList = ref<IRoomItem[]>([])

// 模拟机房数据
const roomList: IRoomItem[] = [
  { value: 'bj-yd-01', name: '北京移动机房1', isp: '1', province: '北京' },
  { value: 'bj-yd-02', name: '北京移动机房2', isp: '1', province: '北京' },
  { value: 'bj-yd-03', name: '北京移动机房3', isp: '1', province: '北京' },
  { value: 'sh-lt-01', name: '上海联通机房1', isp: '2', province: '上海' },
  { value: 'sh-lt-02', name: '上海联通机房2', isp: '2', province: '上海' },
  { value: 'gz-dx-01', name: '广州电信机房1', isp: '3', province: '广东' },
  { value: 'gz-dx-02', name: '广州电信机房2', isp: '3', province: '广东' },
  { value: 'sz-yd-01', name: '深圳移动机房1', isp: '1', province: '广东' },
  { value: 'hz-lt-01', name: '杭州联通机房1', isp: '2', province: '浙江' },
  { value: 'cd-dx-01', name: '成都电信机房1', isp: '3', province: '四川' },
  { value: 'wh-yd-01', name: '武汉移动机房1', isp: '1', province: '湖北' },
  { value: 'nj-lt-01', name: '南京联通机房1', isp: '2', province: '江苏' },
  { value: 'xa-dx-01', name: '西安电信机房1', isp: '3', province: '陕西' }
]

// 根据运营商过滤机房
const filteredRooms = computed(() => {
  if (!currentIsp.value) {
    return roomList
  }
  return roomList.filter(room => room.isp === currentIsp.value)
})

// 模拟异步加载机房数据
const handleLoadData = (isp: string | number) => {
  console.log('加载运营商机房数据:', isp)

  // 模拟网络延迟
  setTimeout(() => {
    asyncRoomList.value = roomList.filter(room => room.isp === isp)
  }, 500)
}

const handleChange1 = (value: string | number, room: IRoomItem | null) => {
  console.log('选择机房1:', value, room)
}

const handleChange2 = (value: string | number, room: IRoomItem | null) => {
  console.log('选择机房2:', value, room)
}

const handleChange3 = (value: string | number, room: IRoomItem | null) => {
  console.log('选择机房3:', value, room)
}

const handleChange4 = (value: string | number, room: IRoomItem | null) => {
  console.log('选择机房4:', value, room)
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #666;
  font-weight: 500;
}

.result {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.result span {
  color: #409eff;
  font-weight: 600;
}
</style>
