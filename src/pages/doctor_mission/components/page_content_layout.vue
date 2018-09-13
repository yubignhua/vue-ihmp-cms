<template>
  <div class="page_content_layout">
    <div class="page_content_header">
      <div class="left_action"></div>
      <div class="right_action">
        <slot name="right_action"></slot>
      </div>
    </div>
    <div class="page_content_body">
      <slot name="content_body"></slot>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  .page_content_layout {
    .page_content_header {
      background-color: #EBEEF5;
      margin: 0;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .page_content_body{
      padding: 30px;
      min-height: 100vh;
    }
  }

</style>
