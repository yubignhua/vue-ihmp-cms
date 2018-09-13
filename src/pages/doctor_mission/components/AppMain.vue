<template>
  <section class="app-main" style="min-height: 100%;padding-top: 50px!important;box-sizing: border-box;">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
