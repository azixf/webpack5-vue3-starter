<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <compoent :is="Component" v-if="$route.meta.keepAlive"></compoent>
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive"></component>
  </router-view>
</template>

<style lang="less">
@import "./styles/common.less";

// #nprogress .bar {
//     background: #1890ff  !important;
//   }

//   #nprogress .spinner-icon {
//     border-top-color: #1890ff  !important;
//     border-left-color: #1890ff  !important;
//   }
</style>
