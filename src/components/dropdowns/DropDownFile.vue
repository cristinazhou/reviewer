<template>
    <Dropdown style="margin-left: 20px" transfer trigger="click" @on-click="judge">
        <i-button type="primary">最新文件
            <Icon type="arrow-down-b"></Icon>
        </i-button>
        <Dropdown-menu slot="list">
            <Dropdown-item name="files">下载</Dropdown-item>
            <Dropdown-item name="detail">详情</Dropdown-item>
            <!--打开pdf-->
        </Dropdown-menu>
    </Dropdown>
</template>
<script>

</script>

<style scoped>

</style>