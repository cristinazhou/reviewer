<template>
    <Steps :current="0" direction="vertical">
        <Step title="未评审" content="这里是该步骤的描述信息" icon="load-d"></Step>
        <Step title="正在评审" content="这里是该步骤的描述信息"icon="load-d"></Step>
        <Step title="已定稿" content="这里是该步骤的描述信息" icon="ios-checkmark"></Step>
        
    </Steps>
</template>
<script>
    export default {
        
    }
</script>

