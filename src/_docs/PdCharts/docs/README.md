# PdCharts

Pandora2 的图表组件，基于 ECharts 封装。

<!-- 加载 demo 组件 end -->

<script setup>
import pie01 from './pie/pie01.vue'
import pie02 from './pie/pie02.vue'
import useCharts from './hook/useCharts.vue'
</script>

<!-- 加载 demo 组件 start -->

## 目录

<div class="chart-category">
  <div class="category-title">基础API示例</div>
  <div class="chart-nav">
    <a class="nav-item" href="javascript:void(0)" onclick="document.getElementById('useCharts').scrollIntoView({behavior: 'smooth'})">
      <span>useCharts</span>
    </a>
  </div>
</div>

<div class="chart-category">
  <div class="category-title">饼图 Pie</div>
  <div class="chart-nav">
    <a class="nav-item" href="javascript:void(0)" onclick="document.getElementById('pie01').scrollIntoView({behavior: 'smooth'})">
      <span>基础饼图</span>
    </a>
    <a class="nav-item" href="javascript:void(0)" onclick="document.getElementById('pie02').scrollIntoView({behavior: 'smooth'})">
      <span>饼图示例 2</span>
    </a>
  </div>
</div>

<style>
.chart-category {
  margin-bottom: 30px;
}
.category-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
  padding-left: 12px;
  border-left: 4px solid #409eff;
}
.chart-nav {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  background-color: #f5f7fa;
  border-radius: 6px;
  color: #606266;
  text-decoration: none !important;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
  cursor: pointer;
  min-width: 120px;
  font-weight: 500;
}
.nav-item:hover {
  color: #409eff;
  background-color: #ecf5ff;
  border-color: #c6e2ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>

<span id="useCharts"></span>
## useCharts Hook 示例

<Preview comp-name="PdCharts" demo-name="hook/useCharts">
  <useCharts />
</Preview>

<span id="pie01"></span>
## 基础饼图

<Preview comp-name="PdCharts" demo-name="pie/pie01">
  <pie01 />
</Preview>

<span id="pie02"></span>
## 饼图示例 2

<Preview comp-name="PdCharts" demo-name="pie/pie02">
  <pie02 />
</Preview>
