<template>
  <div class="app">
    <!-- <WorkOrderManagement /> -->
    <!-- 一个路由出口，用于渲染当前路由路径匹配到的组件。 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import WorkOrderManagement from './components/WorkOrderManagement.vue';
import {RouterLink, RouterView} from 'vue-router'


</script>

<style>
.app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>